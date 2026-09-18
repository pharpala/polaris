/**
 * Capture coaching. These are real measurements taken off the live video
 * frame, not a scripted sequence: the deck's finding is that 48% of ID
 * uploads fail and most abandonment sits at identity capture, so the fix is
 * to catch glare, darkness, blur and framing *before* submission rather than
 * rejecting the photo two days later.
 *
 * Everything here is pure and works on an ImageData, so it can be reasoned
 * about without a camera attached.
 */

export type Issue = 'dark' | 'glare' | 'blur' | 'frame' | 'centre' | 'ok'

export type Metrics = {
  luma: number
  hot: number
  sharpness: number
  fill: number
  offset: number
}

/** Thresholds, gathered in one place so they can be argued with. */
const T = {
  dark: 62,
  hot: 0.055,
  sharp: 7.5,
  fill: 0.08,
  offset: 0.17,
}

/** Mean luminance, blown-highlight share, gradient energy, edge density in
 *  the middle of the frame, and how far the bright mass sits off centre. */
export function measure(d: ImageData): Metrics {
  const { width: w, height: h, data } = d
  const lum = new Float32Array(w * h)

  let sum = 0
  let hot = 0
  for (let i = 0, p = 0; i < data.length; i += 4, p++) {
    const l = 0.2126 * data[i] + 0.7152 * data[i + 1] + 0.0722 * data[i + 2]
    lum[p] = l
    sum += l
    if (l > 245) hot++
  }

  // Gradient energy stands in for sharpness: a blurred frame has soft edges.
  let grad = 0
  let inner = 0
  let innerEdges = 0
  let mx = 0
  let my = 0
  let mass = 0
  const x0 = Math.floor(w * 0.18)
  const x1 = Math.floor(w * 0.82)
  const y0 = Math.floor(h * 0.18)
  const y1 = Math.floor(h * 0.82)

  for (let y = 1; y < h - 1; y++) {
    for (let x = 1; x < w - 1; x++) {
      const p = y * w + x
      const g = Math.abs(lum[p] - lum[p + 1]) + Math.abs(lum[p] - lum[p + w])
      grad += g
      if (x >= x0 && x < x1 && y >= y0 && y < y1) {
        inner++
        if (g > 26) innerEdges++
      }
      const weight = lum[p]
      mass += weight
      mx += x * weight
      my += y * weight
    }
  }

  const n = w * h
  return {
    luma: sum / n,
    hot: hot / n,
    sharpness: grad / n,
    fill: inner === 0 ? 0 : innerEdges / inner,
    offset:
      mass === 0
        ? 0
        : Math.hypot(mx / mass - w / 2, my / mass - h / 2) / Math.hypot(w / 2, h / 2),
  }
}

/** The single most useful thing to say about this frame. Order matters:
 *  telling someone to centre a document they cannot light is useless. */
export function coach(m: Metrics, kind: 'id' | 'selfie'): Issue {
  if (m.luma < T.dark) return 'dark'
  if (m.hot > T.hot) return 'glare'
  if (m.sharpness < T.sharp) return 'blur'
  if (kind === 'id' && m.fill < T.fill) return 'frame'
  if (kind === 'selfie' && m.offset > T.offset) return 'centre'
  return 'ok'
}

/** The sequence shown when there is no camera to read, so the coaching is
 *  still demonstrable. Clearly labelled as such on screen. */
export const SIMULATED: Issue[] = ['dark', 'glare', 'blur', 'ok']
