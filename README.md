# Polaris

The welcome page: the wordmark on white, and nothing else.

## Run it

```bash
npm install
npm run dev
```

## Design system

Three colours, and nothing else: `#FFFFFF`, `#324AFE` electric blue, `#181B1F` ink.
Corners are square — `border-radius: 0` is set globally. Surfaces are flat: no
gradients, no glows, no shadows.

Type is **Calibre**, the brand face. It is not freely licensable, so the stack loads
[General Sans](https://www.fontshare.com/fonts/general-sans) as the closest available
stand-in and lists Calibre first — install Calibre locally and the page picks it up
with no code change.

## Structure

```
index.html       Font loading and the mount point
src/main.tsx     React entry
src/App.tsx      The welcome page
src/styles.css   Palette tokens and the welcome layout
```
