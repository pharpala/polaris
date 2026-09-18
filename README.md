# Polaris

A mobile app demo. The welcome screen — the wordmark on white — inside a handset,
and nothing else.

On a computer the app draws an iPhone silhouette around itself — a 393 × 852pt
display in an 11pt bezel, with the dynamic island, home indicator and the four side
keys, outlined in a hairline against the ink field. It is sized from the viewport
height, so the whole phone stays on screen on a short laptop window without
distorting.

On a phone there is no silhouette. Under 500px wide (or 700px tall) the body, keys
and hardware all go and the app fills the glass, because there is no point drawing
a phone inside a phone.

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
src/App.tsx      The silhouette, status bar and the welcome screen
src/styles.css   Palette tokens, the iPhone silhouette and the welcome layout
```
