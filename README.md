# Polaris

A mobile app demo of the flagship initiative's front door: the Wealthsimple sign-up
flow re-cut to the Polaris story from the 18-month AI transformation deck.

Four screens, each one arguing a claim from the deck:

| Screen | What it carries from the story |
|---|---|
| Launch | The mark on white. Locale and any saved application resolve behind it. |
| Welcome | Four slides: the five-minute open against 22 today, a shortlist instead of a catalogue, language carried through the disclosures, and progress that survives an interruption. |
| Create your login | Email and password, each field carrying **why** it is asked — the deck's answer to "the flow is rigid and offers limited explanation". |
| Confirm it is you | Phone number, with the reason attached and the code explained before it arrives. |

Two details the reference does not have, both from the deck: a **progress rail**, because
"no visible application status" is listed as a current-state failure, and an **AI
disclosure** on the welcome screen, because disclosure by default is one of the program's
Responsible AI controls.

Copy is complete in **English and French**, switched from the globe chip on the welcome
screen — the deck's claim is that translation is embedded in the journey rather than
bolted on, so the copy lives per language in `src/i18n.ts` instead of wrapping an English
original. The flow ends after the phone step; stage 1 of the journey, the guided
questions, is the next thing to build.

On a computer the app draws an iPhone silhouette around itself — a 393 × 852pt display in
an 11pt bezel, with the dynamic island, home indicator and the four side keys, outlined in
a hairline against the ink field. It is sized from the viewport height, so the whole phone
stays on screen on a short laptop window without distorting.

On a phone there is no silhouette. Under 500px wide (or 700px tall) the body, keys and
hardware all go and the app fills the glass, because there is no point drawing a phone
inside a phone.

## Run it

```bash
npm install
npm run dev
```

## The mark

The compass rose is redrawn as a single-colour glyph from the symbol in the Polaris
case brief: a four-point star on a long north–south axis, a bearing ring with
diagonal ticks, and a square hub knocked out of the centre. The brief's navy tile is
dropped — only the symbol carries over. It is inline SVG sized in `em`, so the
lockup holds together at any type size.

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
src/i18n.ts        All customer-facing copy, English and French
src/Icons.tsx      Inline SVG set, including the compass rose
src/Illustrations.tsx  The four carousel diagrams
src/App.tsx        The silhouette, app bar, language sheet and step router
src/screens/       One file per screen
src/styles.css     Palette tokens, the silhouette and the component styles
```
