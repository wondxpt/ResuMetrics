# Capacitor native app icon (Android launcher)

These 3 files are the **native** Android launcher icon source - separate
from `public/` (which only covers the web/PWA favicon that the app's own
pages reference). Capacitor's native icon generator reads from a
`resources/` folder at the root of the *Capacitor* project (not this
`src/` folder).

## Setup

1. Copy these 3 files into `resources/` at the root of your Capacitor
   project (create the folder if it doesn't exist yet):
   - `icon.png` - full/legacy fallback icon
   - `icon-foreground.png` - adaptive icon content layer (transparent bg)
   - `icon-background.png` - adaptive icon background layer (solid navy)

2. Run:
   ```
   npm install -D @capacitor/assets
   npx capacitor-assets generate --android
   npx cap sync android
   ```

3. In Android Studio: **Build > Clean Project**, then
   **Build > Rebuild Project**, then **Run** (uninstall any old build
   from the device first).
