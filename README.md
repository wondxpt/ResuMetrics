# ResuMetrics

<p align="center">
  <a href="https://github.com/wondxpt/ResuMetrics/actions/workflows/ci.yml"><img alt="CI" src="https://github.com/wondxpt/ResuMetrics/actions/workflows/ci.yml/badge.svg?branch=main" /></a>
</p>

<p align="center">
  <img src="https://raw.githubusercontent.com/wondxpt/ResuMetrics/main/profile-banner.svg" alt="ResuMetrics — Make your experience stand out" width="100%" />
</p>

<p align="center">
  <strong>A focused workspace for building clear, polished resumes and exporting them as print-ready PDFs.</strong>
</p>

<p align="center">
  <img alt="React" src="https://img.shields.io/badge/React-19-149eca?logo=react&logoColor=white" />
  <img alt="Vite" src="https://img.shields.io/badge/Vite-7-646CFF?logo=vite&logoColor=white" />
  <img alt="Capacitor" src="https://img.shields.io/badge/Capacitor-Android-119EFF?logo=capacitor&logoColor=white" />
  <img alt="JavaScript" src="https://img.shields.io/badge/JavaScript-ES_Modules-F7DF1E?logo=javascript&logoColor=222222" />
</p>

ResuMetrics is a resume/CV builder built with React and Vite, with an Android app powered by Capacitor. Its goal is simple: help people organize their experience, choose a layout that fits their story, review the result, and produce a clean document they can share.

## Android beta — free download

**Version:** 1.0.1 Beta · **Price:** Free during beta testing

[**Download the Android APK**](https://github.com/wondxpt/ResuMetrics/releases/tag/v1.0.1-beta) from the public GitHub Release page. The APK is intended for Android devices; the AAB is kept locally for potential future store submission.

**Known limitation:** Android's Save PDF action opens the native print UI and shows an A4 preview. Share PDF currently opens that same print UI rather than a dedicated share sheet. This beta has been smoke-tested on a physical device, but workflows are not yet all production-ready. Review exported documents before using them for important applications.

### Install the beta

1. Open the [v1.0.1 Beta release page](https://github.com/wondxpt/ResuMetrics/releases/tag/v1.0.1-beta).
2. Download ResuMetrics-1.0.1-myket.apk.
3. Open the APK on your Android device and follow the installation prompt. Install APKs only from sources you trust.

GitHub downloads are free; Google Play publication is separate and is not required to install this beta.

## What it does

- **Structured resume editing** — work through personal details, experience, education, skills, and certifications in dedicated sections.
- **Multiple resume layouts** — includes Classic, Minimal, Corporate, Creative, Executive, Functional, Canadian, and modern two-column designs.
- **Preview before export** — review the assembled resume before opening the platform’s native print/save flow.
- **Text-based PDF output** — on the web, use the browser print dialog; on Android, the app uses Android’s Print Framework with the existing WebView.
- **Writing and quality helpers** — includes resume completeness checks, ATS-oriented scoring, text polishing, and translation utilities.
- **Language and RTL awareness** — the app includes a language-selection flow and layout support for right-to-left content.

## Technology

| Area | Stack |
| --- | --- |
| UI | React 19, React Router |
| Build | Vite 7 |
| Components and icons | Material UI, Lucide |
| State | Zustand |
| Mobile | Capacitor, Android |
| PDF export | Browser print pipeline and Android Print Framework |

## Run locally

**Requirements:** a current Node.js LTS release and npm.

```bash
git clone https://github.com/wondxpt/ResuMetrics.git
cd ResuMetrics
npm ci
npm run dev
```

Create a production build:

```bash
npm run build
npm run preview
```

## Android workflow

After installing the project dependencies and configuring the Android toolchain:

```bash
npm run build
npx cap sync android
npx cap open android
```

The Android project lives in `android/`. The PDF implementation and print styling are in `src/pdf/`; the native bridge is in `android/app/src/main/java/`.

## Project layout

```text
src/
  assistant/   Resume quality and writing helpers
  pages/       Resume editor steps and preview
  templates/   Resume layout implementations
  pdf/         Print root, pagination and PDF workflow
  i18n/        Language and localization support
android/       Capacitor Android project
public/        Static web assets
```

## Source access and licensing

This repository is public so prospective employers can review and evaluate the implementation. **It is not an open-source-licensed project.** Copyright © 2026 Abbas Shiri. All rights reserved. You may view the code and download a copy for personal evaluation; no license is granted to reuse, adapt, redistribute, publish derivative versions, or use the source commercially without prior written permission. Third-party dependencies and assets remain governed by their own licenses.

The GitHub Actions workflow builds the web bundle on pushes to `main` and pull requests targeting `main`. A passing build confirms compilation, not complete runtime or Android release validation. No public live-demo link is currently configured.
## Feedback

Bug reports and focused improvement suggestions are welcome through [GitHub Issues](https://github.com/wondxpt/ResuMetrics/issues).

---

<p align="center">
  Built to make the next step in a career feel a little clearer.
</p>
