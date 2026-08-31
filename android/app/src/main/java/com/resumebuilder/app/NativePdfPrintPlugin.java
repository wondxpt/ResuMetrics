package com.resumebuilder.app;

import android.app.Activity;
import android.content.Context;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintManager;
import android.webkit.WebView;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

/**
 * Native Android PDF/print bridge.
 *
 * REWRITTEN: this used to receive already-rasterized PDF bytes (a PNG
 * screenshot of the resume, wrapped in a PDF) from the JS side and just
 * stream those bytes into Android's print pipeline. That produced an
 * image-only PDF with no real text layer - not selectable, not
 * searchable, poor ATS compatibility.
 *
 * This version instead asks the app's OWN live WebView (the one
 * already rendering this page) to print ITSELF via
 * WebView.createPrintDocumentAdapter() - Android's standard, documented
 * mechanism for turning a WebView's HTML/CSS into a real, text-based
 * PDF. The WebView's own layout/text engine paginates and shapes
 * glyphs, exactly as it does on screen.
 *
 * This intentionally revives (in a more robust form) an earlier
 * `printHtml` approach that printed the live WebView directly and was
 * abandoned for being fragile: on-screen-only styling on an ancestor of
 * the resume (scroll containers, zoom wrappers, viewport-relative
 * heights) could leak into the print layout pass and push content onto
 * a spurious extra page. The fix is not to avoid WebView printing - it
 * is proper CSS isolation: see src/pdf/print.css and
 * src/pdf/PrintRoot.jsx on the JS side, which print a second, always
 * unscaled, non-absolutely-positioned copy of the resume instead of the
 * interactive Preview viewer's own DOM.
 */
@CapacitorPlugin(name = "NativePdfPrint")
public class NativePdfPrintPlugin extends Plugin {

    @PluginMethod()
    public void printCurrentPage(final PluginCall call) {
        final String jobNameInput = call.getString("jobName", "Resume");

        final Activity activity = getActivity();
        if (activity == null) {
            call.reject("Android activity is not available.");
            return;
        }

        activity.runOnUiThread(() -> {
            try {
                WebView webView = getBridge() != null ? getBridge().getWebView() : null;

                if (webView == null) {
                    call.reject("The app's WebView is not available.");
                    return;
                }

                PrintManager printManager =
                    (PrintManager) activity.getSystemService(Context.PRINT_SERVICE);

                if (printManager == null) {
                    call.reject("Android print service is unavailable.");
                    return;
                }

                String jobName = sanitizeJobName(jobNameInput);

                PrintDocumentAdapter adapter = webView.createPrintDocumentAdapter(jobName);

                PrintAttributes attributes = new PrintAttributes.Builder()
                    .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
                    .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
                    .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
                    .build();

                printManager.print(jobName, adapter, attributes);

                JSObject result = new JSObject();
                result.put("started", true);
                result.put("jobName", jobName);
                call.resolve(result);
            } catch (Exception ex) {
                call.reject("Android could not start the PDF print job.", ex);
            }
        });
    }

    private String sanitizeJobName(String value) {
        String base = (value == null || value.trim().isEmpty()) ? "Resume" : value.trim();
        return base.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
