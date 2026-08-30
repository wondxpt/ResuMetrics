# Favicon / PWA icons

این پکیج شامل `src/` بود، بدون `index.html` یا فولدر `public/`، پس فایل‌های آیکون زیر
در یک پوشه‌ی `public/` جدید در ریشه‌ی پروژه اضافه شدند (کنار `src/`):

- favicon.ico
- favicon-16x16.png
- favicon-32x32.png
- apple-touch-icon.png
- android-chrome-192x192.png
- android-chrome-512x512.png
- site.webmanifest

وقتی `index.html` پروژه رو کنار این فایل‌ها گذاشتید، این تگ‌ها رو داخل `<head>` اضافه کنید:

```html
<link rel="icon" type="image/x-icon" href="/favicon.ico">
<link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png">
<link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png">
<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
<link rel="manifest" href="/site.webmanifest">
<meta name="theme-color" content="#5A55E0">
```

پروژه‌های Vite/CRA به‌صورت پیش‌فرض هر چیزی داخل `public/` رو مستقیم از ریشه‌ی سایت سرو می‌کنن،
پس مسیرهای بالا (`/favicon.ico` و ...) نیازی به تغییر ندارن.
