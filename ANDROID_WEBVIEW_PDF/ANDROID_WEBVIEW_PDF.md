# نصب دانلود PDF داخل WebView اندروید‌استودیو

## چرا این لازمه؟

یک `WebView` خام هیچ مکانیزم دانلودی برای آدرس‌های `blob:` نداره — حتی
با `setDownloadListener` هم این آدرس‌ها گرفته نمی‌شن. برای همین وقتی
دکمه‌ی PDF رو می‌زنید، فایل ساخته می‌شه ولی هیچ‌جا سیو نمی‌شه و
دکمه به‌ظاهر «هیچ کاری نمی‌کنه».

راه‌حل: یک پل جاوااسکریپت (`JavascriptInterface`) بین صفحه‌ی وب و
کاتلین می‌سازیم. کد وب (که همین الان توی `pdfGenerator.js` اضافه
کردم) به‌صورت خودکار این پل رو پیدا می‌کنه و PDF رو به‌شکل base64
براش می‌فرسته. اگه این پل وجود نداشته باشه (مثلاً وقتی از Chrome
معمولی باز می‌کنید)، همون روش قبلی (دانلود مستقیم مرورگر) ادامه
پیدا می‌کنه — یعنی هیچ‌چیزی رو خراب نمی‌کنه.

## ۱. کلاس پل (Bridge) در کاتلین

یک فایل جدید بسازید، مثلاً `AndroidPdfBridge.kt`:

```kotlin
import android.content.ContentValues
import android.content.Context
import android.os.Build
import android.os.Environment
import android.provider.MediaStore
import android.util.Base64
import android.webkit.JavascriptInterface
import android.widget.Toast

class AndroidPdfBridge(private val context: Context) {

    @JavascriptInterface
    fun savePdf(base64Data: String, filename: String) {
        try {
            val bytes = Base64.decode(base64Data, Base64.DEFAULT)
            val safeName = if (filename.isNullOrBlank()) "resume.pdf" else filename

            if (Build.VERSION.SDK_INT >= Build.VERSION_CODES.Q) {
                // Android 10+ : از MediaStore استفاده می‌کنیم، نیازی به
                // permission دستی برای پوشه‌ی Downloads نیست.
                val resolver = context.contentResolver
                val values = ContentValues().apply {
                    put(MediaStore.MediaColumns.DISPLAY_NAME, safeName)
                    put(MediaStore.MediaColumns.MIME_TYPE, "application/pdf")
                    put(MediaStore.MediaColumns.RELATIVE_PATH, Environment.DIRECTORY_DOWNLOADS)
                }

                val uri = resolver.insert(
                    MediaStore.Downloads.EXTERNAL_CONTENT_URI,
                    values
                )

                if (uri != null) {
                    resolver.openOutputStream(uri)?.use { it.write(bytes) }
                    showToast("$safeName در پوشه‌ی Downloads ذخیره شد")
                } else {
                    showToast("ذخیره‌ی PDF ناموفق بود")
                }
            } else {
                // Android 9 و پایین‌تر: نوشتن مستقیم روی external storage
                // (نیاز به WRITE_EXTERNAL_STORAGE permission - پایین‌تر ببینید)
                val downloadsDir = Environment.getExternalStoragePublicDirectory(
                    Environment.DIRECTORY_DOWNLOADS
                )
                val file = java.io.File(downloadsDir, safeName)
                file.writeBytes(bytes)
                showToast("$safeName در پوشه‌ی Downloads ذخیره شد")
            }
        } catch (e: Exception) {
            showToast("خطا در ذخیره‌ی PDF: ${e.message}")
        }
    }

    private fun showToast(message: String) {
        android.os.Handler(context.mainLooper).post {
            Toast.makeText(context, message, Toast.LENGTH_LONG).show()
        }
    }
}
```

## ۲. وصل کردنش به WebView (در Activity یا Fragment شما)

```kotlin
webView.settings.javaScriptEnabled = true
webView.settings.domStorageEnabled = true   // لازم برای localStorage اپ

webView.addJavascriptInterface(AndroidPdfBridge(this), "AndroidPdfBridge")
```

نکته‌ی مهم: اسم `"AndroidPdfBridge"` باید **دقیقاً** همین باشه، چون
کد وب دنبال `window.AndroidPdfBridge.savePdf(...)` می‌گرده.

## ۳. Permission (فقط برای Android 9 و پایین‌تر لازمه)

توی `AndroidManifest.xml`:

```xml
<uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE"
    android:maxSdkVersion="28" />
```

(برای Android 10 به بالا با روش MediaStore که در کد بالا هست، هیچ
permission خاصی لازم نیست.)

## ۴. تست

بعد از این تغییرات، اپ رو دوباره از Android Studio بسازید و نصب
کنید. دکمه‌ی PDF رو بزنید — باید یک Toast با پیام «... در پوشه‌ی
Downloads ذخیره شد» ببینید و فایل توی اپ Files یا Downloads گوشی
پیدا بشه.

اگه بازم کار نکرد، لاگ Logcat رو (فیلتر روی کلمه‌ی `AndroidPdfBridge`
یا `Exception`) بفرستید تا خطای دقیق رو ببینم.
