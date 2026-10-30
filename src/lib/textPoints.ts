/**
 * Sample a string (or a heart) into `count` 3D point targets by rasterising
 * to an offscreen canvas and reading opaque pixels. All targets share the same
 * `count` so a particle system can morph smoothly between them.
 */
interface SampleTextOptions {
  fontSize?: number
  fontFamily?: string
  weight?: number
  worldWidth?: number
}

interface SampleHeartOptions {
  worldWidth?: number
}

type Point = [number, number]

function get2dContext(canvas: HTMLCanvasElement): CanvasRenderingContext2D {
  const ctx = canvas.getContext('2d')
  if (!ctx) throw new Error('Canvas 2D context unavailable')
  return ctx
}

export function sampleText(
  text: string,
  count: number,
  opts: SampleTextOptions = {}
): Float32Array {
  const {
    fontSize = 150,
    fontFamily = '"Cormorant Garamond", Georgia, serif',
    weight = 600,
    worldWidth = 7.5,
  } = opts

  const pad = 60
  const lineGap = 1.18
  const lines = String(text).split('\n')
  const canvas = document.createElement('canvas')
  const ctx = get2dContext(canvas)
  ctx.font = `${weight} ${fontSize}px ${fontFamily}`
  const widest = Math.max(...lines.map((l) => ctx.measureText(l).width))
  const w = Math.ceil(widest) + pad * 2
  const h = Math.ceil(fontSize * lineGap * lines.length) + pad
  canvas.width = w
  canvas.height = h
  ctx.font = `${weight} ${fontSize}px ${fontFamily}`
  ctx.fillStyle = '#fff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  const startY = h / 2 - ((lines.length - 1) * fontSize * lineGap) / 2
  lines.forEach((l, i) => ctx.fillText(l, w / 2, startY + i * fontSize * lineGap))

  const data = ctx.getImageData(0, 0, w, h).data
  const pixels: Point[] = []
  const step = 3 // sampling density
  for (let y = 0; y < h; y += step) {
    for (let x = 0; x < w; x += step) {
      if (data[(y * w + x) * 4 + 3] > 128) pixels.push([x, y])
    }
  }
  return mapToWorld(pixels, count, w, h, worldWidth)
}

export function sampleHeart(count: number, opts: SampleHeartOptions = {}): Float32Array {
  const { worldWidth = 6 } = opts
  const pts: Point[] = []
  const N = Math.max(count * 2, 4000)
  for (let i = 0; i < N; i++) {
    const t = Math.random() * Math.PI * 2
    const fill = Math.pow(Math.random(), 0.5)
    const x = 16 * Math.pow(Math.sin(t), 3) * fill
    const y = (13 * Math.cos(t) - 5 * Math.cos(2 * t) - 2 * Math.cos(3 * t) - Math.cos(4 * t)) * fill
    // canvas-space-ish (y down); normalise later
    pts.push([x + 18, -y + 18])
  }
  return mapToWorld(pts, count, 36, 36, worldWidth)
}

function mapToWorld(
  pixels: Point[],
  count: number,
  w: number,
  h: number,
  worldWidth: number
): Float32Array {
  const out = new Float32Array(count * 3)
  const scale = worldWidth / w
  if (pixels.length === 0) return out
  for (let i = 0; i < count; i++) {
    const [px, py] = pixels[(Math.random() * pixels.length) | 0]
    out[i * 3] = (px - w / 2) * scale + (Math.random() - 0.5) * 0.01
    out[i * 3 + 1] = -(py - h / 2) * scale + (Math.random() - 0.5) * 0.01
    out[i * 3 + 2] = (Math.random() - 0.5) * 0.18
  }
  return out
}
