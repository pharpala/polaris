/**
 * The assistant's matcher. The replies are scripted, but the routing is real:
 * a question is scored against each intent's keywords, the best scoring
 * intent answers, and anything that scores nothing gets an honest "I don't
 * have that" plus a route to a person — which is what the deck requires of
 * customer-facing AI.
 */

export type Intent = {
  id: string
  q: string
  a: string
  /** Used instead of `a` once the customer has told us they are a newcomer. */
  aNewcomer?: string
  match: string[]
}

export type Reply = { text: string; handoff?: boolean }

const norm = (s: string) =>
  s
    .toLowerCase()
    .replace(/['’]/g, '')
    .replace(/[^a-z0-9àâçéèêëîïôûùüÿñæœ ]+/g, ' ')

/** One point per keyword present, two if the keyword is more than one word. */
export function score(question: string, keywords: string[]) {
  const q = ` ${norm(question)} `
  return keywords.reduce((n, k) => {
    const key = norm(k)
    if (!q.includes(` ${key} `) && !q.includes(key)) return n
    return n + (key.includes(' ') ? 2 : 1)
  }, 0)
}

export function answer(
  question: string,
  intents: Intent[],
  opts: { newcomer: boolean; fallback: string; handoff: string },
): Reply {
  let best: Intent | null = null
  let bestScore = 0

  for (const intent of intents) {
    const n = score(question, intent.match)
    if (n > bestScore) {
      best = intent
      bestScore = n
    }
  }

  if (!best) return { text: opts.fallback, handoff: true }
  if (best.id === 'human') return { text: opts.handoff, handoff: true }

  return { text: opts.newcomer && best.aNewcomer ? best.aNewcomer : best.a }
}
