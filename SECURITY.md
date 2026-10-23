# Security Policy

## Supported release

The current public Android beta is **ResuMetrics 1.0.1 Beta**. Beta builds may contain defects and should not be treated as a guarantee of production readiness.

## Reporting a vulnerability

Please do not publish exploitable security details, private resume content, credentials, API keys, or tokens in a public issue.

Use GitHub's private vulnerability reporting feature for this repository if it is available. Otherwise, contact the repository maintainer privately through the contact route on the maintainer's GitHub profile. Include the affected version, impact, and minimal reproduction steps; redact personal information and secrets.

Please allow the maintainer time to investigate before publicly disclosing an unpatched vulnerability.

## Handling sensitive data

- Never commit \`.env\` files, signing keys, keystore passwords, or service credentials.
- Do not use real personal resumes or contact information in automated tests or screenshots.
- Report suspected secret exposure promptly so credentials can be rotated and exposed artifacts addressed.
