# Contributing to ResuMetrics

Thank you for helping improve ResuMetrics. Small, focused changes are easier to review and safer to release.

## Before opening a pull request

1. Check existing issues and pull requests for related work.
2. Explain the problem being solved and keep the change focused.
3. Avoid committing generated build output, signed APK/AAB files, local environment files, or signing material.
4. Never include real resumes, contact details, access tokens, API keys, or other private data in issues, tests, screenshots, or logs.

## Local checks

Use Node.js 22 and npm:

\`\`\`bash
npm ci
npm test
npm run build
\`\`\`

For Android changes, also run:

\`\`\`bash
npx cap sync android
cd android
./gradlew :app:assembleDebug
\`\`\`

On Windows PowerShell, run the wrapper as \`.\gradlew.bat :app:assembleDebug\` from the \`android\` directory.

## Pull request checklist

- Describe the user-visible impact and any trade-offs.
- Include steps to reproduce a bug or verify a feature.
- Add or update automated tests for changed behavior where practical.
- Include before/after screenshots for meaningful UI changes, using synthetic data.
- Verify web build and tests pass; note any checks you could not run.
- Update the README or changelog if behavior, installation, or release details changed.

## Review and release

Pull requests targeting \`main\` run the web tests/build and an Android debug build in GitHub Actions. The Android artifact from CI is an unsigned debug build for validation, not a store-ready release. Store releases require separate release preparation, signing, verification, and human review.

The repository does not currently grant a general open-source reuse license. Please do not assume that submitting a contribution grants permission to reuse or redistribute the project outside the terms stated in the README.
