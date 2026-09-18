# Polaris

A mobile app demo of the flagship initiative's front door, built to the Polaris story in
the 18-month AI transformation deck.

**There is no home screen and no sign-up.** The customer is already signed in, so the mark
resolves and stage 1 of the journey — understand intent — starts asking. Three questions
establish life stage, residency and goals, which is what the recommendation is ranked
against and what decides which identity documents the capture step has to accept.

| Screen | What it establishes |
|---|---|
| Launch | The mark on white. Locale and any saved application resolve behind it. |
| Which of these sounds most like you? | Life stage. Newcomers lead the list — the segment the deck names, abandoning at 48.9% against 37% overall. |
| Your status in Canada | Residency. Behind a field rather than on the page, because the list is long and the answer is one fact. |
| What do you need the account for? | Goals, multi-select. The inputs the recommendation ranks against. |

Three things carried from the deck that a stock sign-up flow does not have: every question
says **why it is asked** and states plainly what it does *not* decide; a **progress rail**
sits on every screen, because "no visible application status" is on the current-state
failure list; and the **AI disclosure** rides the first screen read rather than a settings
page, because disclosure by default is one of the program's Responsible AI controls.

Copy is complete in **English and French**, switchable from the globe chip on every
question — the deck's claim is that translation is embedded in the journey rather than
bolted on, so the copy lives per language in `src/i18n.ts` instead of wrapping an English
original. Switching mid-flow keeps every answer. The flow ends after the third question;
stage 2, the recommendation with its reasoning attached, is next.

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
src/App.tsx        The silhouette, app bar, language sheet and step router
src/components/    The question shell, choice cards and the bottom sheet
src/screens/       One file per question
src/styles.css     Palette tokens, the silhouette and the component styles
```
