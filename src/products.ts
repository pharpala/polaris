/**
 * The catalogue's rules. Copy lives in `i18n.ts`; what a product is *for*
 * lives here, so the ranking can be read and argued with.
 *
 * The deck's requirement is a shortlist with the reasoning attached, not a
 * catalogue and not an opaque pick: two or three options, ranked on fit,
 * suitability-based rather than sales-weighted.
 */

export type Product = {
  id: string
  /** Only offered to a customer who told us one of these. Absent = everyone. */
  requires?: string[]
  /** The goal ids this product actually serves. */
  fits: string[]
  /** Goals this product is the purpose-built answer to, rather than merely a
   *  workable one. An FHSA beats a savings account for a first home. */
  best?: string[]
}

export const products: Product[] = [
  /* Day to day. Order matters: it settles ties. */
  { id: 'newcomer', requires: ['newcomer'], fits: ['rent', 'pay', 'transfer', 'abroad', 'budget'] },
  { id: 'student', requires: ['student', 'grad'], fits: ['rent', 'pay', 'budget'] },
  { id: 'sixty', requires: ['retirement'], fits: ['rent', 'pay', 'budget'] },
  { id: 'everyday', fits: ['rent', 'pay', 'budget'] },
  { id: 'simple', fits: ['rent', 'budget'] },

  /* Saving, and the credit file. */
  { id: 'savings', fits: ['rainy', 'home', 'budget'] },
  { id: 'builder', fits: ['credit'], best: ['credit'] },

  /* Registered plans. Each is the purpose-built answer to one goal. */
  { id: 'fhsa', fits: ['home'], best: ['home'] },
  { id: 'rrsp', fits: ['retire'], best: ['retire'] },
  { id: 'resp', fits: ['education'], best: ['education'] },
  { id: 'tfsa', fits: ['rainy', 'home', 'retire', 'learn'] },
  { id: 'gic', fits: ['rainy', 'retire'] },
  { id: 'invest', fits: ['learn'], best: ['learn'] },
]

/** A goal a product serves is worth two; being built for this customer's own
 *  situation is worth three on top, so a targeted account outranks a generic
 *  one that ticks the same boxes. The bonus only applies to a product that
 *  serves at least one stated goal — otherwise a student account would win
 *  for a student who asked about credit history, which is the wrong answer
 *  dressed up as personalization. */
const GOAL = 2
const TARGETED = 3
const PURPOSE_BUILT = 2

export function rank(profile: string[], goals: string[]) {
  const eligible = products.filter(
    (p) => !p.requires || p.requires.some((r) => profile.includes(r)),
  )

  const scored = eligible
    .map((p) => {
      const hits = goals.filter((g) => p.fits.includes(g)).length
      if (hits === 0) return { product: p, score: 0 }
      const purpose = (p.best ?? []).filter((b) => goals.includes(b)).length
      return {
        product: p,
        score: hits * GOAL + purpose * PURPOSE_BUILT + (p.requires ? TARGETED : 0),
      }
    })
    .filter((r) => r.score > 0)
    .sort((a, b) => b.score - a.score)

  // Nothing stated, or only "I'm not sure yet": fall back to what this
  // customer is eligible for rather than showing an empty screen.
  return scored.length > 0 ? scored.map((r) => r.product) : eligible
}

/** The goals the chosen product is actually answering, in catalogue order, so
 *  the reason quotes the customer rather than describing the product. */
export function reasons(product: Product, goals: string[], limit = 2) {
  return product.fits.filter((f) => goals.includes(f)).slice(0, limit)
}
