import jsPDF from "jspdf";
import { toSvg } from "html-to-image";
import { Capacitor, registerPlugin } from "@capacitor/core";

import { computeSafePageBreaks, A4_PAGE_HEIGHT_PX } from "./pagination";


// Android native print backend. On a Capacitor Android build this hands the
// ALREADY-RENDERED PDF bytes (the exact same bytes Save/Share produce, via
// the jsPDF/toSvg pipeline below) to a tiny native PrintDocumentAdapter that
// just streams those bytes into the print job. It does NOT touch the live
// WebView, the DOM, or any CSS at all.
//
// This replaces an earlier approach (`printHtml`) that printed the live
// Preview WebView directly via `webView.createPrintDocumentAdapter()`,
// hiding all non-resume UI with injected `display:none` CSS. That approach
// was fragile by construction: it depended on every ancestor element
// between <body> and .resume-page (scroll containers, zoom wrappers, MUI
// Paper/Container chrome meant only for on-screen viewing) having its
// on-screen sizing (height: 100vh, overflow: hidden/auto, etc.) behave
// correctly once Android's own print engine re-paginated it - and any one
// of those on-screen-only styles leaking through was enough to push real
// content onto a spurious extra page or off the visible print area
// entirely, producing near-blank pages. Printing pre-rendered PDF bytes
// instead removes that whole class of bug: there is no second layout pass
// to get wrong.
const NativePdfPrint = registerPlugin("NativePdfPrint");

function isCapacitorAndroidNative() {
  try {
    if (Capacitor && typeof Capacitor.getPlatform === "function") {
      return Capacitor.getPlatform() === "android";
    }
  } catch (_) {
    // Fall through to the global Capacitor object below.
  }

  return (
    typeof window !== "undefined" &&
    window.Capacitor &&
    (window.Capacitor.getPlatform?.() === "android" ||
      window.Capacitor.getPlatform?.() === "Android" ||
      window.Capacitor.isNativePlatform?.() === true)
  );
}

// WHY html-to-image INSTEAD OF html2canvas:
// html2canvas re-implements CSS text layout itself and draws glyphs
// with its own positioning logic. For joining scripts (Persian/
// Arabic) this is a long-standing, well-documented upstream bug -
// html2canvas miscalculates advance widths/direction for joined
// letters, which is exactly what shows up as "letters overlapping/
// jumbled" (see html2canvas issues #948, #686, #289, #1755). This is
// independent of, and NOT fixed by, waiting for fonts to load below.
//
// html-to-image instead serializes the DOM into an SVG <foreignObject>
// and lets the browser's OWN text-shaping engine paint it (the same
// engine that renders the on-screen preview correctly) - so Persian/
// Arabic joining is correct by construction. To avoid the *other*
// known foreignObject problem (custom @font-face rules failing to
// apply inside foreignObject's isolated context on some WebViews),
// html-to-image fetches every referenced font file and inlines it as
// a base64 data URI directly into the generated SVG's <style> block
// (this is automatic - see the `skipFonts` option if it ever needs to
// be disabled). That sidesteps the external-stylesheet issue instead
// of hitting it.
//
// CAVEAT: SVG-foreignObject-to-canvas is not supported on iOS Safari/
// WKWebView (stricter same-origin canvas-tainting rules can make the
// resulting canvas unreadable). This fix targets Android WebView
// (Capacitor's Android target, per the rest of this file). If the app
// also ships on iOS, that export path needs to be verified separately
// and may need the server-side (Puppeteer) approach instead.
//
// Many mobile browsers (Android WebViews especially) cap canvas
// dimensions well below desktop limits - both total area AND a single
// axis. We still render ONE PAGE AT A TIME onto its own small canvas
// (cropped out of a single rasterized SVG image via drawImage's
// source-rect) instead of building one giant canvas for the whole,
// possibly multi-page resume - so no single canvas ever needs to be
// taller than one printed page, regardless of how long the resume is.
//
// PREFERRED_SCALE is a multiplier on top of the browser's 96px/inch CSS
// reference, so scale 2 == 192 DPI. We target print-quality 600 DPI, i.e.
// 600 / 96 = 6.25. MAX_SAFE_CANVAS_PIXELS is raised to match - it must
// stay >= (page width px * A4_PAGE_HEIGHT_PX) * PREFERRED_SCALE^2 (~=
// 793.7008 * 1122.5197 * 6.25^2 ~= 34,802,531px at 600 DPI), or
// pickSafeScale() will silently clamp back down below 600 DPI on lower-end
// devices.
//
// CAVEAT - read before raising this further: at 600 DPI a single page's
// canvas is ~4961 x 7016px (vs. ~2480 x 3508px at the old 300 DPI). Some
// older/low-end Android WebViews cap a single canvas dimension at 4096px
// regardless of total area - note that's the HEIGHT (7016px) that blows
// past this first, not the width, since resume pages are portrait.
// pickSafeScale() below guards both the total-area cap AND this
// single-axis cap (via MAX_SAFE_CANVAS_DIMENSION), so on a device that
// hits this limit the export automatically steps down to a lower DPI
// instead of producing a corrupted/thin-looking canvas. That single-axis
// cap isn't reliably queryable from JS, so MAX_SAFE_CANVAS_DIMENSION is a
// conservative hardcoded floor (4096) rather than a detected value - if
// exports still look wrong on a specific device after this, that's the
// first constant to try lowering further (e.g. to 3800) for some margin.
const MAX_SAFE_CANVAS_PIXELS = 36_000_000;
// Guards the OTHER known mobile canvas limit that MAX_SAFE_CANVAS_PIXELS
// (a total-AREA cap) does not cover: many Android WebViews also cap a
// SINGLE canvas dimension (width OR height) at ~4096px regardless of
// total area. At 600 DPI a page's height alone (~1122.52 * 6.25 ~=
// 7016px) blows past this even though the total-area cap above doesn't
// catch it - that mismatch is exactly what pickSafeScale() below fixes
// by taking the min of both constraints. 4096 is the documented common
// floor across Android WebView/iOS Safari; kept as its own constant
// (rather than folded into MAX_SAFE_CANVAS_PIXELS) since it's a
// per-axis limit, not an area one.
const MAX_SAFE_CANVAS_DIMENSION = 4096;
const PREFERRED_SCALE = 600 / 96;
const MIN_SCALE = 1;

/**
 * Waits for web fonts to finish loading before we rasterize anything.
 * Without this, an export can render with the fallback font (and
 * slightly different text metrics, throwing off the page-break
 * measurements too). Guarded with a timeout because
 * `document.fonts.ready` can hang instead of resolving on a few
 * older WebViews.
 */
async function ensureFontsReady(timeoutMs = 4000) {
  if (typeof document === "undefined" || !document.fonts) return;

  try {
    await Promise.race([
      document.fonts.ready,
      new Promise((resolve) => setTimeout(resolve, timeoutMs)),
    ]);
  } catch (error) {
    // Non-fatal - proceed with capture even if font-loading status
    // couldn't be determined.
  }
}

/**
 * Renders `element` (the .resume-page node) to a paginated PDF and
 * triggers a download/share.
 *
 * Throws on failure instead of swallowing errors, so the caller (the
 * Preview page) can show the person a real "something went wrong"
 * message instead of the button silently doing nothing.
 *
 * Returns { pageCount, deliveryMethod } on success.
 */
export async function generatePDF(element, options = {}) {
  if (!element) {
    throw new Error("Could not find the resume on the page to export.");
  }

  await ensureFontsReady();

  // Measure safe break points (and the page's own margins) on the LIVE
  // DOM, AFTER fonts are ready, so pagination matches what will
  // actually be painted. This is what lets us cut between items
  // instead of through the middle of a line of text, and re-insert a
  // proper top/bottom margin on every virtual page.
  const computed = window.getComputedStyle(element);
  const paddingTopPx = parseFloat(computed.paddingTop) || 0;
  const paddingBottomPx = parseFloat(computed.paddingBottom) || 0;

  const rawBreaksPx = computeSafePageBreaks(element);

  const elementWidthPx = element.scrollWidth || 1;
  const elementHeightPx = element.scrollHeight || 1;

  // Scale is chosen against a SINGLE page's dimensions (width x ~one
  // A4 page height), not the whole possibly-multi-page document,
  // since we only ever rasterize one page's worth of pixels at a
  // time - see the per-page capture loop below.
  const scale = pickSafeScale(elementWidthPx, A4_PAGE_HEIGHT_PX);

  const boundariesPx = [0, ...rawBreaksPx, elementHeightPx];
  const pageCount = boundariesPx.length - 1;

  // Save, Share, and (now) Print all use the SAME browser/jsPDF rendering
  // pipeline, so they always produce identical, correctly-paginated output.
  // Print no longer has its own native WebView/DOM re-layout path - see the
  // NativePdfPrint comment above and printViaCapacitorAndroid() below.

  const pdf = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4",
    compress: true,
  });

  const pageWidthMm = pdf.internal.pageSize.getWidth();

  // Render the WHOLE resume ONCE, as an SVG (vector, with fonts -
  // including Vazirmatn - embedded as base64 so the isolated
  // foreignObject context can actually see them). This is what fixes
  // the overlapping-letters bug: the browser's own text engine shapes
  // the Persian/Arabic joins correctly, instead of html2canvas's
  // from-scratch (and buggy, for joining scripts) text drawing.
  //
  // NOTE ON RESOLUTION - PLEASE READ BEFORE TOUCHING THIS:
  // `toSvg`'s own `pixelRatio` option does NOT affect the width/height
  // of the SVG it returns (that's only honored by html-to-image's
  // toPng/toCanvas helpers, which we don't use here - we need the raw
  // SVG so we can crop it page-by-page below). Passing `pixelRatio`
  // to `toSvg` is silently a no-op: the returned SVG - and therefore
  // `sourceImage.naturalWidth` below - always comes back at the
  // element's native 1x CSS-pixel size (96 DPI) no matter what scale
  // is requested. (Confirmed by inspecting exported PDFs: the embedded
  // JPEGs were 794x1123px / 96 PPI regardless of this file's scale
  // constants.)
  //
  // The actual fix is to upscale the SVG markup ourselves, by editing
  // its own `width`/`height` attributes (upscaleSvgMarkup below) while
  // leaving its `viewBox` at the original, unscaled coordinate space.
  // That's different from passing a bigger `width`/`height` to `toSvg`
  // itself, which instead resizes the SOURCE NODE before capture (no
  // proportional scale-up, just a differently-sized layout - see
  // https://github.com/bubkoo/html-to-image/issues/82). Editing the
  // SVG's own width/height post-hoc keeps the foreignObject content
  // laid out exactly as on-screen, and lets the browser's own
  // rasterizer paint that content at the higher target resolution
  // when the data URL is loaded into the Image below (real text
  // rendering at the target DPI, not a stretched bitmap).
  //
  // We still only rasterize one page's worth of pixels at a time
  // below (via drawImage's source-rect crop), so this doesn't
  // reintroduce the "one giant canvas" memory problem on low-end
  // Android devices - the SVG itself is cheap; only the per-page
  // canvases are pixel-bound.
  const renderWidthPx = Math.round(elementWidthPx * scale);
  const renderHeightPx = Math.round(elementHeightPx * scale);

  let svgDataUrl;
  try {
    svgDataUrl = await toSvg(element, {
      backgroundColor: "#ffffff",
      cacheBust: true,
    });
  } catch (error) {
    throw new Error(
      "Couldn't render the resume for export. " +
        (error && error.message ? error.message : "")
    );
  }

  svgDataUrl = upscaleSvgMarkup(svgDataUrl, renderWidthPx, renderHeightPx);

  const sourceImage = new Image();
  sourceImage.decoding = "sync";

  try {
    await new Promise((resolve, reject) => {
      sourceImage.onload = () => resolve();
      sourceImage.onerror = () =>
        reject(new Error("Couldn't load the rendered resume image."));
      sourceImage.src = svgDataUrl;
    });
  } catch (error) {
    throw new Error(
      "The captured resume image came out empty. Try closing other apps to free up memory and try again."
    );
  }

  // Read the ACTUAL resolution the browser produced rather than
  // trusting our requested size to have been honored exactly
  // (rounding can differ slightly by engine) - everything below is
  // computed from this real number so the crop coordinates always
  // line up with the real image, regardless of that rounding.
  const actualRenderWidthPx = sourceImage.naturalWidth || renderWidthPx;
  const actualScaleX = actualRenderWidthPx / elementWidthPx;

  console.log(
    `[pdfGenerator] requested scale=${scale.toFixed(3)} (target ${renderWidthPx}px wide) - browser actually produced ${actualRenderWidthPx}px wide (effective scale=${actualScaleX.toFixed(3)})`
  );

  for (let pageIndex = 0; pageIndex < pageCount; pageIndex += 1) {
    const sliceStartPx = boundariesPx[pageIndex];
    const sliceEndPx = boundariesPx[pageIndex + 1];
    const sliceHeightPx = Math.max(sliceEndPx - sliceStartPx, 1);

    const isFirstPage = pageIndex === 0;
    const isLastPage = pageIndex === pageCount - 1;

    const topInsetPx = isFirstPage ? 0 : paddingTopPx;
    const bottomInsetPx = isLastPage ? 0 : paddingBottomPx;

    const topInsetCanvasPx = Math.round(topInsetPx * actualScaleX);
    const bottomInsetCanvasPx = Math.round(bottomInsetPx * actualScaleX);

    // Source-rect coordinates, in the SAME already-scaled pixel space
    // the SVG was actually rendered at - not the original 1x CSS px
    // space.
    const sourceSliceStartPx = Math.round(sliceStartPx * actualScaleX);
    const sourceSliceHeightPx = Math.round(sliceHeightPx * actualScaleX);

    const pageCanvas = document.createElement("canvas");
    pageCanvas.width = actualRenderWidthPx;
    pageCanvas.height =
      sourceSliceHeightPx + topInsetCanvasPx + bottomInsetCanvasPx;

    const pageContext = pageCanvas.getContext("2d");

    if (!pageContext) {
      throw new Error(
        "This browser couldn't create a canvas for the PDF page."
      );
    }

    pageContext.fillStyle = "#ffffff";
    pageContext.fillRect(0, 0, pageCanvas.width, pageCanvas.height);

    // Straight 1:1 copy now (source-rect size == destination-rect
    // size), so there's no resampling/stretch step left to blur.
    try {
      pageContext.drawImage(
        sourceImage,
        0,
        sourceSliceStartPx,
        actualRenderWidthPx,
        sourceSliceHeightPx,
        0,
        topInsetCanvasPx,
        actualRenderWidthPx,
        sourceSliceHeightPx
      );
    } catch (error) {
      throw new Error(
        `Couldn't capture page ${pageIndex + 1} of the resume for export. ` +
          (error && error.message ? error.message : "")
      );
    }

    // PNG instead of JPEG for the per-page slices: this is a text-heavy
    // document (crisp black glyphs, thin rules, solid-color blocks), and
    // JPEG's lossy encoding - chroma subsampling in particular - is
    // exactly what blurs letterforms and puts color fringing around
    // glyph edges, even when the underlying canvas is rasterized at a
    // genuine 300 DPI. That's what was making the "300 DPI" export still
    // look soft/artifacted: the resolution was already correct, the lossy
    // re-encode afterward was throwing quality away. PNG is lossless, so
    // once the canvas itself is at the right resolution (handled above by
    // upscaleSvgMarkup), what you see in the PDF is pixel-for-pixel what
    // the browser rendered - no re-encoding softness on top. Cropping one
    // page at a time (rather than PNG-encoding the whole multi-page
    // document at once) keeps this affordable on lower-end Android
    // devices; PNG files just run larger than the old JPEGs did.
    const imgData = pageCanvas.toDataURL("image/png");

    const imgWidth = pageWidthMm;
    const imgHeight = (pageCanvas.height * imgWidth) / pageCanvas.width;

    if (pageIndex > 0) {
      pdf.addPage();
    }

    pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight, undefined, "FAST");

    // Let the canvas be garbage-collected before the next iteration
    // rather than holding every page's canvas in memory at once -
    // this matters a lot on lower-end Android devices.
    pageCanvas.width = 0;
    pageCanvas.height = 0;
  }

  const deliveryMethod = await downloadPdf(pdf, "resume.pdf", options);

  return { pageCount, deliveryMethod };
}

/**
 * Re-declares an html-to-image SVG data URL's own `width`/`height` at
 * `targetWidthPx` x `targetHeightPx`, while leaving its `viewBox` (the
 * original, unscaled coordinate space the foreignObject content is laid
 * out in) untouched. This is what actually produces a higher-resolution
 * raster once the data URL is loaded into an <img>/Image - see the long
 * comment above the call site for why `toSvg`'s own `pixelRatio` option
 * can't be relied on for this.
 *
 * Falls back to the original, unmodified data URL on any parsing error
 * (e.g. an unexpected html-to-image output format) so a bug here can only
 * ever degrade the export back to the previous 1x resolution, never break
 * it outright.
 */
function upscaleSvgMarkup(svgDataUrl, targetWidthPx, targetHeightPx) {
  try {
    const svgMarkup = decodeSvgDataUrl(svgDataUrl);

    // Only touch the *opening* <svg ...> tag itself (matched up to its
    // first '>') and leave everything else in the document completely
    // untouched. Deliberately NOT round-tripping the whole document
    // through DOMParser/XMLSerializer here: the foreignObject content is
    // arbitrary resume text/markup and any single well-formedness quirk
    // in it (an unescaped entity, a not-strictly-XML-closed tag, etc.)
    // would make a strict XML re-parse of the *entire* document throw,
    // silently falling all the way back to 1x for the whole export. A
    // plain string edit of just the opening tag can't be broken by
    // anything elsewhere in the document.
    const openTagMatch = svgMarkup.match(/<svg\b[^>]*>/);

    if (!openTagMatch) {
      console.warn(
        "Couldn't find an <svg> opening tag to upscale - exporting at 1x."
      );
      return svgDataUrl;
    }

    const originalOpenTag = openTagMatch[0];

    const widthMatch = originalOpenTag.match(/\swidth="([\d.]+)"/);
    const heightMatch = originalOpenTag.match(/\sheight="([\d.]+)"/);
    const originalWidth = widthMatch ? widthMatch[1] : String(targetWidthPx);
    const originalHeight = heightMatch ? heightMatch[1] : String(targetHeightPx);

    const hasViewBox = /\sviewBox="/.test(originalOpenTag);
    const viewBoxAttr = hasViewBox
      ? ""
      : ` viewBox="0 0 ${originalWidth} ${originalHeight}"`;

    const newOpenTag = originalOpenTag
      .replace(/\swidth="[\d.]+"/, "")
      .replace(/\sheight="[\d.]+"/, "")
      .replace(
        /^<svg\b/,
        `<svg width="${targetWidthPx}" height="${targetHeightPx}"${viewBoxAttr}`
      );

    const upscaledMarkup =
      svgMarkup.slice(0, openTagMatch.index) +
      newOpenTag +
      svgMarkup.slice(openTagMatch.index + originalOpenTag.length);

    // Dev-visible confirmation that this code path actually ran and what
    // it produced - check the browser/WebView console (or `adb logcat`,
    // or chrome://inspect for a Capacitor Android build) if resolution
    // still looks wrong after this change, to see whether it's this step
    // that's failing versus something further down the pipeline.
    console.log(
      `[pdfGenerator] upscaled SVG from ${originalWidth}x${originalHeight} to ${targetWidthPx}x${targetHeightPx}`
    );

    return "data:image/svg+xml;charset=utf-8," + encodeURIComponent(upscaledMarkup);
  } catch (error) {
    console.warn(
      "Couldn't upscale the SVG for high-res export, falling back to 1x:",
      error
    );
    return svgDataUrl;
  }
}

/**
 * html-to-image encodes its SVG data URLs as
 * `data:image/svg+xml;charset=utf-16;base64,<...>`. Decodes that back to
 * the raw SVG markup string.
 */
function decodeSvgDataUrl(svgDataUrl) {
  const commaIndex = svgDataUrl.indexOf(",");
  const meta = svgDataUrl.slice(0, commaIndex);
  const payload = svgDataUrl.slice(commaIndex + 1);

  if (meta.includes(";base64")) {
    const binary = atob(payload);
    const bytes = new Uint8Array(binary.length);
    for (let i = 0; i < binary.length; i += 1) {
      bytes[i] = binary.charCodeAt(i);
    }
    const encoding = meta.includes("utf-16") ? "utf-16" : "utf-8";
    return new TextDecoder(encoding).decode(bytes);
  }

  return decodeURIComponent(payload);
}

function pickSafeScale(widthPx, heightPx) {
  const basePixels = widthPx * heightPx;

  if (basePixels <= 0) return PREFERRED_SCALE;

  const scaleForArea = Math.sqrt(MAX_SAFE_CANVAS_PIXELS / basePixels);

  // Separate from scaleForArea on purpose: this catches the case where
  // total area is still under the cap but ONE dimension (almost always
  // height, since resume pages are portrait) alone exceeds a device's
  // single-axis canvas/texture limit. Without this, a page that's tall
  // and narrow can sail past scaleForArea's check while still being too
  // tall for the device to actually rasterize - which is what produced
  // corrupted/thin-looking text on some phones at 600 DPI even though
  // MAX_SAFE_CANVAS_PIXELS wasn't hit.
  const scaleForAxis = MAX_SAFE_CANVAS_DIMENSION / Math.max(widthPx, heightPx);

  const safeScale = Math.min(PREFERRED_SCALE, scaleForArea, scaleForAxis);

  return Math.max(Math.round(safeScale * 100) / 100, MIN_SCALE);
}

function buildPdfFilename() {
  const root = document.querySelector(".resume-page");
  const explicitName = root?.getAttribute("data-pdf-filename");
  const raw = explicitName || "Resume";
  const safe = raw.replace(/[^a-z0-9._-]+/gi, "_").replace(/^_+|_+$/g, "");
  return `${safe || "Resume"}.pdf`;
}

/**
 * Triggers the actual file delivery. Three paths, tried in order:
 *
 * 1. Capacitor native app (Android/iOS): writes the PDF via the
 *    official @capacitor/filesystem plugin, then opens the OS Share
 *    sheet via @capacitor/share so the person can save it to Files,
 *    Google Drive, send it in WhatsApp, etc. This sidesteps Android's
 *    scoped-storage permission complexity entirely by handing the
 *    file to the OS instead of writing directly into the public
 *    Downloads folder ourselves.
 * 2. Plain browser (desktop or mobile Chrome/Safari, not wrapped): an
 *    explicit Blob + object URL + anchor click. The anchor's
 *    "download" attribute doesn't open a new tab/window, so it isn't
 *    affected by popup blockers.
 * 3. If the anchor click somehow doesn't result in a download, falls
 *    back to opening the PDF in a new tab, where the browser's own
 *    PDF viewer typically offers its own save/share button.
 */
async function downloadPdf(pdf, filename, options = {}) {
  const blob = pdf.output("blob");

  if (!blob || blob.size === 0) {
    throw new Error("The generated PDF file came out empty.");
  }

  const mode = options.mode || "save";

  if (
    typeof window !== "undefined" &&
    window.Capacitor &&
    typeof window.Capacitor.isNativePlatform === "function" &&
    window.Capacitor.isNativePlatform()
  ) {
    if (mode === "print" && isCapacitorAndroidNative()) {
      return await printViaCapacitorAndroid(pdf, filename);
    }
    return await saveViaCapacitor(pdf, filename, options);
  }

  if (mode === "share" && navigator.share) {
    try {
      const file = new File([blob], filename, {
        type: "application/pdf",
      });

      if (!navigator.canShare || navigator.canShare({ files: [file] })) {
        await navigator.share({
          title: "Resume PDF",
          files: [file],
        });
        return "browser-share";
      }
    } catch (error) {
      if (error?.name === "AbortError") return "browser-share-cancelled";
      console.warn("Web Share failed, falling back to save:", error);
    }
  }

  if (mode === "print") {
    const blobUrl = URL.createObjectURL(blob);
    const printWindow = window.open(blobUrl, "_blank");

    if (!printWindow) {
      URL.revokeObjectURL(blobUrl);
      throw new Error(
        "Your browser blocked the print window. Please allow pop-ups for this site and try again."
      );
    }

    const cleanup = () => {
      setTimeout(() => URL.revokeObjectURL(blobUrl), 5000);
    };

    try {
      printWindow.addEventListener("load", () => {
        setTimeout(() => {
          printWindow.focus();
          printWindow.print();
        }, 500);
      }, { once: true });
    } catch {
      cleanup();
    }

    return "browser-print";
  }

  if (mode === "save" && "showSaveFilePicker" in window) {
    try {
      const handle = await window.showSaveFilePicker({
        suggestedName: filename,
        types: [
          {
            description: "PDF document",
            accept: { "application/pdf": [".pdf"] },
          },
        ],
      });

      const writable = await handle.createWritable();
      await writable.write(blob);
      await writable.close();
      return "browser-save-picker";
    } catch (error) {
      if (error?.name === "AbortError") return "browser-save-cancelled";
      console.warn("Save picker failed, falling back to download:", error);
    }
  }

  const blobUrl = URL.createObjectURL(blob);

  try {
    const link = document.createElement("a");
    link.href = blobUrl;
    link.download = filename;
    link.rel = "noopener";
    link.style.display = "none";

    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  } catch (error) {
    console.error(
      "Anchor download failed, falling back to opening the PDF:",
      error
    );

    const opened = window.open(blobUrl, "_blank");

    if (!opened) {
      URL.revokeObjectURL(blobUrl);
      throw new Error(
        "Your browser blocked the download. Please allow pop-ups/downloads for this site and try again."
      );
    }
  }

  setTimeout(() => {
    URL.revokeObjectURL(blobUrl);
  }, 10000);

  return "browser-download";
}

/**
 * Native Android print path. Sends the ALREADY-RENDERED PDF bytes (same
 * bytes as Save/Share, produced by the jsPDF/toSvg pipeline above) to a
 * minimal native PrintDocumentAdapter that just streams them into the
 * print job - no live-DOM/CSS re-layout involved. See the NativePdfPrint
 * comment near the top of this file for why the old WebView-print
 * approach was replaced.
 */
async function printViaCapacitorAndroid(pdf, filename) {
  const base64Data = pdf.output("datauristring").split(",")[1];

  if (!base64Data) {
    throw new Error("Couldn't prepare the PDF for printing.");
  }

  const pageCount = pdf.internal.getNumberOfPages();

  await NativePdfPrint.printFile({
    fileName: filename,
    base64Data,
    pageCount,
  });

  // A plain string, matching the other downloadPdf() return values
  // ("browser-share", "browser-download", etc.) - generatePDF() wraps
  // whatever this returns as its own top-level `deliveryMethod`, and
  // Preview.jsx checks `result.deliveryMethod === "android-print"`.
  return "android-print";
}

/**
 * Native save path used only inside a Capacitor-wrapped app. The
 * imports are dynamic so this code has zero effect (and no build
 * dependency) when the app runs as a plain website - the module is
 * only ever fetched when actually running inside Capacitor.
 */
async function saveViaCapacitor(pdf, filename, options = {}) {
  let Filesystem, Directory, Share;

  try {
    ({ Filesystem, Directory } = await import("@capacitor/filesystem"));
    ({ Share } = await import("@capacitor/share"));
  } catch (error) {
    throw new Error(
      "This app is missing the @capacitor/filesystem and @capacitor/share " +
        "packages. Run: npm install @capacitor/filesystem @capacitor/share, " +
        "then npx cap sync android."
    );
  }

  const base64Data = pdf.output("datauristring").split(",")[1];

  if (!base64Data) {
    throw new Error("Couldn't prepare the PDF for saving.");
  }

  if ((options.mode || "save") === "save") {
    // SAVE must be independent from SHARE. Write the generated PDF to
    // the app's Documents directory and do not open the Android share
    // sheet. This keeps the button semantics correct: Save saves; Share
    // shares.
    //
    // Directory.Documents is used here instead of Cache because Cache can
    // be purged by Android and is not an appropriate long-lived destination
    // for a user-generated resume. Capacitor resolves this to the app's
    // Documents location on Android; no MANAGE_EXTERNAL_STORAGE permission
    // is requested.
    const written = await Filesystem.writeFile({
      path: filename,
      data: base64Data,
      directory: Directory.Documents,
      recursive: true,
    });

    return {
      method: "native-save",
      uri: written.uri,
      path: written.path,
    };
  }

  const written = await Filesystem.writeFile({
    path: filename,
    data: base64Data,
    directory: Directory.Cache,
  });

  try {
    await Share.share({
      title: filename,
      url: written.uri,
      dialogTitle: "Share your resume PDF",
    });
  } catch (shareError) {
    if (shareError?.message) {
      console.warn("Share sheet dismissed or unavailable:", shareError);
    }
  }

  return "native-share";
}
