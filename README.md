# Polaris

A mobile app demo. The welcome screen — the wordmark on white — inside a handset,
and nothing else.

On a desktop browser the app draws its own device: a 390 × 812 handset on an ink
field, with a status bar, dynamic island and home indicator. Opened on a real phone
(or any viewport under 460px) the mockup disappears and the app fills the glass,
because there is no point drawing a phone inside a phone.

## Run it

```bash
npm install
npm run dev
```

## Design system

Three colours, and nothing else: `#FFFFFF`, `#324AFE` electric blue, `#181B1F` ink.
Corners are square — `border-radius: 0` is set globally. The only exceptions are the
device mockup and its hardware, which are physical objects rather than UI. Surfaces
are flat: no gradients, no glows, no shadows.

Type is **Calibre**, the brand face. It is not freely licensable, so the stack loads
[General Sans](https://www.fontshare.com/fonts/general-sans) as the closest available
stand-in and lists Calibre first — install Calibre locally and the page picks it up
with no code change.

## Structure

```
index.html       Font loading and the mount point
src/main.tsx     React entry
src/App.tsx      The device shell, status bar and the welcome screen
src/styles.css   Palette tokens, the handset mockup and the welcome layout
```
