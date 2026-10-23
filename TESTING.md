# Testing and release validation

ResuMetrics uses automated checks and a separate hands-on validation step. A green build confirms that code compiles; it does not prove every resume workflow is correct.

## Automated checks

Run locally:

\`\`\`bash
npm ci
npm test
npm run build
\`\`\`

The Node.js test suite covers key behaviors in the local ATS keyword scorer and resume completeness checks. It uses Node's built-in test runner and requires no extra test framework.

For Android-specific changes:

\`\`\`bash
npx cap sync android
cd android
./gradlew :app:assembleDebug
\`\`\`

GitHub Actions runs the web unit tests and production build, then syncs Capacitor and builds an unsigned Android debug APK. The debug APK is uploaded as a short-lived workflow artifact for inspection. CI does not sign a release APK/AAB or publish to an app store.

## Manual smoke test before a beta release

- Create a resume and edit personal details.
- Add, edit, and remove experience, education, skills, and certifications.
- Switch templates and verify the preview reflects the selected template.
- Check long content and page breaks; save/print a PDF and inspect each page.
- Check right-to-left content and a non-English language if those areas changed.
- On Android, confirm installation and launch; test Save PDF and document the Share PDF behavior.
- Confirm the version name/code, signing certificate, release checksum, and public download link.
- Review release notes for known limitations and never claim untested workflows passed.

## Release artifacts and secrets

Signed APK/AAB files and local build outputs should not be committed to the source tree. Keep signing material in the local ignored keystore configuration or an appropriately protected CI secret store. Never put signing passwords or private keys in logs or release notes.
