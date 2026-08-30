package com.resumebuilder.app;

import android.app.Activity;
import android.content.Context;
import android.os.Bundle;
import android.os.CancellationSignal;
import android.os.ParcelFileDescriptor;
import android.print.PageRange;
import android.print.PrintAttributes;
import android.print.PrintDocumentAdapter;
import android.print.PrintDocumentInfo;
import android.print.PrintManager;
import android.util.Base64;

import com.getcapacitor.JSObject;
import com.getcapacitor.Plugin;
import com.getcapacitor.PluginCall;
import com.getcapacitor.PluginMethod;
import com.getcapacitor.annotation.CapacitorPlugin;

import java.io.ByteArrayInputStream;
import java.io.FileOutputStream;
import java.io.InputStream;
import java.io.OutputStream;

/**
 * Native Android PDF print bridge.
 *
 * IMPORTANT: this does NOT touch the app's live WebView, DOM, or CSS. The
 * JS side (pdfGenerator.js) renders the resume through the exact same
 * jsPDF/toSvg pipeline used for Save and Share, and this plugin just
 * streams those already-correct PDF bytes into Android's print pipeline
 * via a minimal PrintDocumentAdapter.
 *
 * This intentionally replaces an earlier `printHtml` approach that printed
 * the live Preview WebView directly (via `webView.createPrintDocumentAdapter()`
 * plus injected CSS to hide all non-resume UI). That approach re-laid-out
 * the whole page a second time inside Android's print engine, and any
 * on-screen-only styling on an ancestor of the resume (scroll containers,
 * zoom wrappers, viewport-relative heights, etc.) that didn't survive that
 * second layout pass could push real content onto a spurious extra page or
 * off the printable area - producing near-blank output. Printing
 * pre-rendered PDF bytes has no second layout pass, so that whole class of
 * bug can't happen here.
 */
@CapacitorPlugin(name = "NativePdfPrint")
public class NativePdfPrintPlugin extends Plugin {

    @PluginMethod()
    public void printFile(final PluginCall call) {
        final String fileName = call.getString("fileName", "Resume.pdf");
        final String base64Data = call.getString("base64Data");
        final int pageCount = call.getInt("pageCount", 1);

        if (base64Data == null || base64Data.isEmpty()) {
            call.reject("No PDF data was provided to print.");
            return;
        }

        final byte[] pdfBytes;
        try {
            pdfBytes = Base64.decode(base64Data, Base64.DEFAULT);
        } catch (Exception ex) {
            call.reject("Couldn't decode the PDF data for printing.", ex);
            return;
        }

        if (pdfBytes.length == 0) {
            call.reject("The PDF data for printing came out empty.");
            return;
        }

        final Activity activity = getActivity();
        if (activity == null) {
            call.reject("Android activity is not available.");
            return;
        }

        activity.runOnUiThread(() -> {
            try {
                PrintManager printManager =
                    (PrintManager) activity.getSystemService(Context.PRINT_SERVICE);

                if (printManager == null) {
                    call.reject("Android print service is unavailable.");
                    return;
                }

                String jobName = sanitizeFileName(fileName);

                PrintDocumentAdapter adapter =
                    new PdfFilePrintAdapter(jobName, pdfBytes, pageCount);

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

    private String sanitizeFileName(String value) {
        String base = value == null || value.trim().isEmpty()
            ? "Resume.pdf"
            : value.trim();

        base = base.replaceAll("[^a-zA-Z0-9._-]", "_");
        if (!base.toLowerCase().endsWith(".pdf")) {
            base += ".pdf";
        }
        return base;
    }

    /**
     * Streams a fixed, already-rendered PDF byte array into Android's print
     * pipeline. No layout, no rasterization, no DOM - `onWrite` is a plain
     * byte copy, so the output is guaranteed to be pixel-identical to the
     * Save/Share PDF.
     */
    private static class PdfFilePrintAdapter extends PrintDocumentAdapter {
        private final String jobName;
        private final byte[] pdfBytes;
        private final int pageCount;

        PdfFilePrintAdapter(String jobName, byte[] pdfBytes, int pageCount) {
            this.jobName = jobName;
            this.pdfBytes = pdfBytes;
            this.pageCount = pageCount;
        }

        @Override
        public void onLayout(
            PrintAttributes oldAttributes,
            PrintAttributes newAttributes,
            CancellationSignal cancellationSignal,
            LayoutResultCallback callback,
            Bundle extras
        ) {
            if (cancellationSignal.isCanceled()) {
                callback.onLayoutCancelled();
                return;
            }

            PrintDocumentInfo info = new PrintDocumentInfo.Builder(jobName)
                .setContentType(PrintDocumentInfo.CONTENT_TYPE_DOCUMENT)
                .setPageCount(pageCount > 0 ? pageCount : PrintDocumentInfo.PAGE_COUNT_UNKNOWN)
                .build();

            callback.onLayoutFinished(info, !newAttributes.equals(oldAttributes));
        }

        @Override
        public void onWrite(
            PageRange[] pages,
            ParcelFileDescriptor destination,
            CancellationSignal cancellationSignal,
            WriteResultCallback callback
        ) {
            try (
                InputStream in = new ByteArrayInputStream(pdfBytes);
                OutputStream out = new FileOutputStream(destination.getFileDescriptor())
            ) {
                byte[] buffer = new byte[8192];
                int read;

                while ((read = in.read(buffer)) >= 0) {
                    if (cancellationSignal.isCanceled()) {
                        callback.onWriteCancelled();
                        return;
                    }
                    out.write(buffer, 0, read);
                }

                callback.onWriteFinished(new PageRange[]{ PageRange.ALL_PAGES });
            } catch (Exception ex) {
                callback.onWriteFailed(ex.getMessage());
            }
        }
    }
}
