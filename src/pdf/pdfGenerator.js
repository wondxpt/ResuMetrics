import { Capacitor, registerPlugin } from "@capacitor/core";

// Android native print backend. On a Capacitor Android build this asks
// the app's OWN live WebView (the same one rendering this page) to
// print itself through Android's real Print Framework
// (PrintManager + WebView.createPrintDocumentAdapter()). That is
// Android's standard, documented way to turn HTML/CSS into a real,
// text-based PDF - the WebView's own layout/text engine does the
// pagination and glyph shaping, exactly like Chrome's "Save as PDF"
// does on desktop. See NativePdfPrintPlugin.java for the native side
// and its history comment for why this replaced an image-bytes
// pipeline.
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
      window.Capacitor.isNativePlatform?.() === true)
  );
}

/**
 * Sets document.title for the duration of the print job, since several
 * browsers (and the Android/desktop "Save as PDF" print destinations)
 * use the current tab title as the SUGGESTED file name in their save
 * dialog. Restored immediately after.
 */
function withSuggestedFilename(suggestedName, fn) {
  if (typeof document === "undefined") return fn();

  const previousTitle = document.title;
  const safe = (suggestedName || "Resume").trim() || "Resume";

  document.title = safe;

  const restore = () => {
    document.title = previousTitle;
  };

  try {
    const result = fn();
    // window.print() is synchronous on most engines but some
    // browsers fire 'afterprint' asynchronously once the native
    // dialog closes - restore on both paths so a slow dialog
    // doesn't leave the tab title wrong in the meantime.
    if (typeof window !== "undefined") {
      window.addEventListener("afterprint", restore, { once: true });
    }
    setTimeout(restore, 3000);
    return result;
  } catch (error) {
    restore();
    throw error;
  }
}

function buildSuggestedFilename(fullName) {
  const raw = String(fullName || "Resume").trim();
  const safe = raw.replace(/[^a-z0-9._-]+/gi, "_").replace(/^_+|_+$/g, "");
  return safe || "Resume";
}

/**
 * Exports the resume as a real, text-based PDF.
 *
 * On the web, `mode` only changes the status text shown to the person -
 * every mode opens the SAME browser print dialog (there is no
 * headless, dialog-free way to rasterize arbitrary CSS into a real PDF
 * text layer from client-side JS alone in a browser tab), and the
 * dialog itself offers Save/Share/Print once open.
 *
 * On Android (Capacitor native), all three modes open the same system
 * print UI (see NativePdfPrintPlugin.java for why a dialog-free path
 * isn't possible for a real, text-based PDF) - only the print job
 * *name* differs. Once that system screen is open, "Save as PDF" and
 * a Share icon are both reachable from it on stock Android, so `mode`
 * still nudges the person toward the right destination even though it
 * no longer skips the dialog outright.
 *
 * Returns { deliveryMethod } on success; never throws for a
 * user-cancelled dialog (there is no reliable cross-browser signal for
 * that, unlike the old Web Share / File System Access APIs), so the
 * caller should treat "opened" as success and not show an error.
 */
export async function printResume({ mode = "save", filename } = {}) {
  const suggestedName = buildSuggestedFilename(filename);

  if (isCapacitorAndroidNative()) {
  // All three modes below open Android's system print UI (see
  // NativePdfPrintPlugin.java's class comment for why). deliveryMethod
  // still distinguishes them so the caller's status message can say
  // the right thing.
  if (mode === "share") {
      const result = await NativePdfPrint.sharePdf({ jobName: suggestedName });
      return { deliveryMethod: "android-share", ...result };
    }

    if (mode === "save") {
      const result = await NativePdfPrint.savePdfDirect({ jobName: suggestedName });
      return { deliveryMethod: "android-save", ...result };
    }

    await NativePdfPrint.printCurrentPage({ jobName: suggestedName });
    return { deliveryMethod: "android-print" };
  }

  if (typeof window === "undefined" || typeof window.print !== "function") {
    throw new Error("Printing isn't supported in this environment.");
  }

  withSuggestedFilename(suggestedName, () => window.print());

  const deliveryMethod =
    mode === "print"
      ? "browser-print"
      : mode === "share"
        ? "browser-print-share"
        : "browser-print-save";

  return { deliveryMethod };
}
