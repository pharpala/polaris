# Polaris

A mobile app demo of the flagship initiative's front door, built to the Polaris story in
the 18-month AI transformation deck.

**There is no home screen and no sign-up.** The customer is already signed in, so the mark
resolves and stage 1 of the journey — understand intent — starts asking. Three questions
establish life stage, residency and goals, which is what the recommendation is ranked
against and what decides which identity documents the capture step has to accept.

**The path is not fixed.** The first question is a multi-select, and each thing the
customer picks opens its own follow-up, so the question set is built from their answers
rather than declared up front. The dot count in the app bar changes as they choose.

| Answer | The follow-up it opens | The two answers |
|---|---|---|
| I'm a newcomer to Canada | Let's get your banking set up in Canada. | Already in Canada · Preparing to arrive |
| I'm a student | Let's build this around school. | Studying now · Starting soon |
| I just graduated | Let's set you up for what's next. | Lined up work · Still looking |
| I'm retirement planning | Let's plan around retirement. | Already retired · A few years off |
| Other | Tell us in your own words. | Free text, routed to whoever reviews the file |

Each follow-up names what the customer said in its own subhead — "You said you just
moved" — so it reads as a reply rather than the next page of a form. Two answers means
there is nothing to confirm: the tap is the answer and the screen advances.

The closing question bends the same way, and it is the one the recommendation is ranked
against. A newcomer is asked **"What would you like to do as you settle into Canada?"**,
grouped under *Get settled* and *Build for the future*, with transferring money into the
country and building Canadian credit history on the list. Everyone else gets the general
set under *Day to day*. "I'm not sure yet" is exclusive: picking it clears the rest, and
picking anything else clears it.

Three things carried from the deck that a stock sign-up flow does not have: every question
says **why it is asked** and states plainly what it does *not* decide; progress is stated
in **words and dots** on every screen, because "no visible application status" is on the
current-state failure list; and the **assistant** sits in a floating Need help pill,
reached when someone is stuck rather than standing between them and the account.

## The recommendation

Eight products, and a ranking that can be read and argued with — the rules live in
`src/products.ts`, the words in `src/i18n.ts`.

A product declares the goals it serves and, optionally, who it is *for*. A goal it serves
scores two; being built for this customer's own situation scores three on top, but **only
for a product that serves at least one stated goal** — otherwise a student account wins
for a student who asked about credit history, which is the wrong answer dressed up as
personalization. Anything scoring nothing is not shown. If nothing scores at all, because
the customer picked "I'm not sure yet", it falls back to what they are eligible for
rather than an empty screen.

| Told us | Suggested |
|---|---|
| Newcomer · everyday expenses, receive pay | Polaris Newcomer Chequing |
| Student · everyday expenses, receive pay | Student Chequing |
| Retirement · surprises, learn investing | Everyday Savings |
| Graduate · credit history only | Credit Builder Card |
| Newcomer · not sure yet | Polaris Newcomer Chequing, generic reason |

The reason quotes the customer rather than describing the product — "You said you want to
cover everyday expenses and receive pay. Polaris Newcomer Chequing is built for that." —
and every fee is on the card rather than behind a link. **Compare other accounts** shows
the top three with the trade-off spelled out on each ("Cheaper than Everyday Chequing, but
only worth it under about twelve transactions a month"), because a recommendation the
customer cannot check is a sales pitch. Choosing a different one carries through.

## The assistant

Replies are scripted. The routing is not. What the customer types is normalised and scored
against the keyword sets in `src/assistant.ts`, the best-scoring intent answers, and a
question that scores nothing gets an honest "I don't have that one" plus a route to a
person — which is what the deck requires of customer-facing AI.

Two things make it read as smart rather than canned:

- **It knows the step.** The offered questions are the ones people actually ask there, and
  each one drops off the list once asked.
- **It knows what the customer said.** Once someone has told us they are new to Canada,
  the answers about documents, fees and branch visits change — the ID answer lists foreign
  passports and PR cards, and the fee answer leads with the first year free.

Free text routes without help from the offered chips: "how much does it cost every month"
finds the fee, "do i need to go into a branch" finds the branch answer, "what happens to
my data" finds the privacy answer, "can i speak to someone please" hands off, and "what is
the capital of peru" declines and offers a person.

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

Surface treatment follows the target design: a warm paper ground (`#F7F6F2`), white cards
on 12px radii, pill commits, and a display serif — [Source Serif
4](https://fonts.google.com/specimen/Source+Serif+4) — reserved for the wordmark and
headlines. **Calibre** does all the UI work: the stack loads [General
Sans](https://www.fontshare.com/fonts/general-sans) as the closest licensable stand-in and
lists Calibre first, so installing it locally upgrades the page with no code change.

`#324AFE` is the single accent — selection ticks, the active dot, the assistant. `#181B1F`
is type and the primary commit. Surfaces are flat: no gradients, no glows, and the only
shadow in the sheet lifts the floating assistant off the page.

This replaces the earlier square-corner, pure-white treatment. The radii live in two
tokens (`--r`, `--pill`), so reverting is a two-line change.

## Structure

```
index.html       Font loading and the mount point
src/main.tsx     React entry
src/i18n.ts        All customer-facing copy, English and French
src/Icons.tsx      Inline SVG set, including the compass rose
src/App.tsx        The silhouette, app bar, language sheet and step router
src/products.ts    The catalogue's rules and the ranking
src/assistant.ts   Intent matcher and scoring for the assistant
src/components/    The question shell, choice cards, the assistant and the sheet
src/screens/       Launch, Profile, Follow (every branch), Goals, Recommend, Compare
src/styles.css     Palette tokens, the silhouette and the component styles
```
