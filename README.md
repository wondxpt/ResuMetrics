# ResumeBuilder Native Android PDF patch

Copy/merge this `android/` folder into the project root. The important files are:

`android/app/src/main/java/com/resumebuilder/app/MainActivity.java`
`android/app/src/main/java/com/resumebuilder/app/NativePdfPrintPlugin.java`

The plugin prints the existing Capacitor WebView instead of creating a second WebView. The React `src/pdf/pdfGenerator.js` in the companion source ZIP prepares a print-only clone inside the same document and restores the live UI after the Android print job finishes.

The native print attributes request A4 and a 600 DPI print resolution. Android's print service/driver ultimately determines the actual printer output.
