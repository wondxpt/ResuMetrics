// Estimated pagination used ONLY by the live Preview page, to draw
// dashed page-break guides and the "N pages" badge as a heads-up for
// the person editing their resume. The actual exported PDF no longer
// uses this - real pagination now comes from the browser/WebView's
// own print engine (see pdfGenerator.js's printResume() and
// print.css), which paginates real text and is authoritative. This
// file's output is a same-content estimate for the on-screen guide
// only and may not land on pixel-identical breaks to the print
// engine's own page breaks.

// Height of the printable content area of one A4 page, in CSS px at the
// browser's standard 96px-per-inch reference.
//
// This used to be the FULL physical sheet height (297mm / 1122.52px),
// back when print.css gave @page a margin of 0 and each template faked
// its own page margin with internal padding. That's why the on-screen
// "Page 2 starts here" guide used to land well past where the real
// printed page 2 actually began - it was estimating ~30mm more usable
// height per page than the browser's print engine actually had.
//
// print.css now reserves a real, uniform 15mm @page margin on every
// side of every physical page (see the note there), which shrinks the
// printable area to 210mm x 267mm. That 267mm is what this constant
// must track for the guide to line up with the real PDF/print output.
const A4_PRINTABLE_HEIGHT_MM = 267;
export const A4_PAGE_HEIGHT_PX = A4_PRINTABLE_HEIGHT_MM * (96 / 25.4);

// `.resume-page` sets `minHeight: 297mm` (see ResumePage.jsx) so that a
// short, genuinely one-page resume still fills a full printed page. But
// `element.scrollHeight` is an integer - browsers round it up - while
// A4_PAGE_HEIGHT_PX above is fractional (1122.5197). That mismatch alone
// (scrollHeight reporting 1123 for content whose real height is
// 1122.5197) was enough to make computeSafePageBreaks() think a purely
// single-page resume overflowed by a fraction of a pixel, inserting one
// extra, essentially blank page. This tolerance absorbs that sub-pixel/
// integer-rounding overshoot; it's intentionally larger than the ~0.5px
// worst case to also cover minor cross-browser rounding differences,
// while still being far too small to ever hide a real extra line of
// content.
const PAGE_HEIGHT_TOLERANCE_PX = 2;

const MAX_PAGES = 40;

/**
 * Finds Y offsets (CSS px, relative to `element`'s own top edge) where the
 * resume can safely be cut into printed pages:
 *   - never through the middle of a text-bearing leaf element, and
 *   - always leaving room for a top/bottom margin on every page, not just
 *     the first and last.
 *
 * Returns an array of break Y-offsets, in the *original, unbroken*
 * coordinate space of `element` (i.e. as it is naturally laid out before
 * any page-break spacing is inserted). Empty array means the content fits
 * on a single page.
 */
export function computeSafePageBreaks(element) {
  if (!element) return [];

  const totalHeight = element.scrollHeight;

  if (totalHeight <= A4_PAGE_HEIGHT_PX + PAGE_HEIGHT_TOLERANCE_PX) {
    return [];
  }

  const elementRect = element.getBoundingClientRect();

  // The Preview viewer fits the page to the available width by applying
  // a CSS `transform: scale(...)` to an ancestor of `element` (see
  // Preview.jsx). getBoundingClientRect() reports POST-transform
  // (visual, on-screen) coordinates, while `totalHeight` above comes
  // from `scrollHeight`, which is a pre-transform layout measurement
  // and is therefore NOT affected by that scale. Whenever the viewer
  // isn't at exactly 100% zoom, mixing the two without correction means
  // every leaf's top/bottom is measured in "on-screen" pixels while the
  // page budget (A4_PAGE_HEIGHT_PX) and totalHeight are in true CSS
  // pixels - the two are silently in different units. That mismatch
  // uniformly scales *where the code thinks each leaf sits* relative to
  // the page boundary, which is exactly what let cuts fall mid-bullet
  // instead of on an actual line/element boundary. Recovering the
  // element's own current scale from its rendered vs. true height and
  // dividing every measurement back into true CSS px keeps this
  // function's arithmetic in one consistent, zoom-independent unit.
  const renderedScale =
    totalHeight > 0 ? elementRect.height / totalHeight : 1;
  const scale = renderedScale > 0 ? renderedScale : 1;

  const leafNodes = Array.from(
    element.querySelectorAll("*")
  ).filter((node) => node.children.length === 0);

  const intervals = leafNodes
    .map((node) => {
      const r = node.getBoundingClientRect();
      if (r.height <= 0) return null;
      return {
        top: (r.top - elementRect.top) / scale,
        bottom: (r.bottom - elementRect.top) / scale,
      };
    })
    .filter(Boolean)
    .sort((a, b) => a.top - b.top);

  function nearestSafeCut(targetY, floor) {
    // Repeats the "does this land inside a leaf?" check against the
    // NEW cut position, not just the original targetY - a single pass
    // only guarantees the cut clears whichever element(s) originally
    // straddled targetY. Moving the cut earlier to dodge one element
    // can land it inside a DIFFERENT, earlier element that didn't
    // straddle targetY at all (e.g. an email line inside a
    // certification block) - that unchecked second collision was
    // exactly what produced cuts through the middle of text like
    // "saaedxpt@outlook.com" in exported PDFs.
    //
    // Each iteration can only move `cut` strictly earlier (to some
    // iv.top < cut), so this is monotonically decreasing and bounded
    // below by 0 - it always terminates on its own. `guard` is just a
    // defensive cap in case of unexpected input, not something normal
    // runs are expected to hit.
    let cut = targetY;
    let guard = intervals.length + 1;

    while (guard > 0) {
      guard -= 1;

      let collided = false;
      for (const iv of intervals) {
        if (iv.top < cut && iv.bottom > cut) {
          cut = Math.min(cut, iv.top);
          collided = true;
        }
      }

      if (!collided) break;
    }

    return Math.max(cut, floor + 1);
  }

  const breaks = [];
  let cursor = 0;

  while (breaks.length < MAX_PAGES) {
    // Every physical printed page now gets its 15mm margin from the
    // browser's own @page rule (see print.css), reserved automatically
    // and identically on every page - not from this template's own
    // padding, and not only on the first/last page. A4_PAGE_HEIGHT_PX
    // is already the printable (margin-excluded) height, so no extra
    // top/bottom budget needs to be carved out of it here anymore.
    const pageBudget = A4_PAGE_HEIGHT_PX;

    if (totalHeight - cursor <= pageBudget + PAGE_HEIGHT_TOLERANCE_PX) {
      // Remaining content fits on this (the last) page.
      break;
    }

    const idealCut = cursor + pageBudget;

    let cut = nearestSafeCut(idealCut, cursor);
    if (cut <= cursor) {
      // Fallback: a single element taller than one page - don't get
      // stuck, fall back to the ideal cut so we still make progress.
      cut = idealCut;
    }

    breaks.push(cut);
    cursor = cut;
  }

  return breaks;
}

/**
 * Convenience helper: total page count implied by a set of break points.
 */
export function pageCountFromBreaks(breaks) {
  return breaks.length + 1;
}
