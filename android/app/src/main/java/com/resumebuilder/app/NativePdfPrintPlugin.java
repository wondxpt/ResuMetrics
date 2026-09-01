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
 * REWRITTEN (again): a real, text-based PDF (not a screenshot/image -
 * see src/pdf/print.css for why that matters for ATS parsing) can only
 * come from the WebView's own PrintDocumentAdapter
 * (WebView.createPrintDocumentAdapter()). Driving that adapter's
 * onLayout()/onWrite() directly - i.e. skipping the system print UI
 * entirely for a silent "save straight to Downloads" or "open the
 * share sheet directly" - requires constructing
 * PrintDocumentAdapter.LayoutResultCallback / WriteResultCallback
 * instances. Those two classes can only be instantiated by the Android
 * print framework itself; their constructors are not accessible to
 * app code outside the android.print package (that produces a build
 * error: "LayoutResultCallback() is not public ... cannot be accessed
 * from outside package"). There is no supported way around this -
 * reflection can bypass the compiler, but the same constructor is also
 * on Android's restricted "non-SDK interface" list from API 28+, so a
 * reflection-based build would still fail (or silently misbehave) on
 * most real devices.
 *
 * So the ONLY officially supported way to get a real PDF out of the
 * WebView is PrintManager.print(), which always shows the system print
 * UI. All three actions below (Print / Save / Share) therefore hand
 * the adapter to PrintManager and let the person finish from there -
 * "Save as PDF" and a Share icon are both built into that system
 * screen on stock Android. What's still genuinely distinct per action
 * is the print job's *name* the JS side passes in.
 */
@CapacitorPlugin(name = "NativePdfPrint")
public class NativePdfPrintPlugin extends Plugin {

    @PluginMethod()
    public void printCurrentPage(final PluginCall call) {
        printViaSystemDialog(call, "Android could not start the PDF print job.");
    }

    @PluginMethod()
    public void savePdfDirect(final PluginCall call) {
        // No storage permission needed here (and none is declared on
        // this plugin) - PrintManager/the system "Save as PDF" printer
        // handles the destination itself via its own picker, the same
        // way it would for any other app's Print/Export-to-PDF menu
        // item.
        printViaSystemDialog(call, "Android could not start the PDF save.");
    }

    @PluginMethod()
    public void sharePdf(final PluginCall call) {
        printViaSystemDialog(call, "Android could not start the PDF share.");
    }

    /**
     * Shared implementation for all three JS-facing actions: hands the
     * WebView's real PrintDocumentAdapter to PrintManager, which shows
     * Android's system print UI (Print / Save as PDF / Share are all
     * reachable from there). `call` resolves as soon as the job has
     * been handed off - same as before, this does not (and cannot)
     * wait for the person to finish interacting with that system UI.
     */
    private void printViaSystemDialog(final PluginCall call, final String failureMessage) {
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

                printManager.print(jobName, adapter, buildPrintAttributes());

                JSObject result = new JSObject();
                result.put("started", true);
                result.put("jobName", jobName);
                result.put("fileName", jobName + ".pdf");
                call.resolve(result);
            } catch (Exception ex) {
                call.reject(failureMessage, ex);
            }
        });
    }

    private PrintAttributes buildPrintAttributes() {
        // NO_MARGINS here is intentional and matches printCurrentPage():
        // the resume's own @page CSS margin (see src/pdf/print.css)
        // already reserves a real 15mm border on every printed page.
        // Asking Android's print attributes for a margin ON TOP of that
        // would double it up.
        return new PrintAttributes.Builder()
            .setMediaSize(PrintAttributes.MediaSize.ISO_A4)
            .setColorMode(PrintAttributes.COLOR_MODE_COLOR)
            .setMinMargins(PrintAttributes.Margins.NO_MARGINS)
            .build();
    }

    private String sanitizeJobName(String value) {
        String base = (value == null || value.trim().isEmpty()) ? "Resume" : value.trim();
        return base.replaceAll("[^a-zA-Z0-9._-]", "_");
    }
}
