export interface RgbColor {
  r: number
  g: number
  b: number
}

export function clampChannel(value: number): number {
  return Math.min(255, Math.max(0, Math.round(value)))
}

export function parseHex(input: string): RgbColor | null {
  const raw = input.trim().replace(/^#/, '')
  if (!/^[0-9a-f]{3}$|^[0-9a-f]{6}$/i.test(raw)) return null

  const hex =
    raw.length === 3
      ? raw
          .split('')
          .map(c => c + c)
          .join('')
      : raw

  return {
    r: Number.parseInt(hex.slice(0, 2), 16),
    g: Number.parseInt(hex.slice(2, 4), 16),
    b: Number.parseInt(hex.slice(4, 6), 16),
  }
}

export function toHex({ r, g, b }: RgbColor): string {
  const channel = (n: number) => clampChannel(n).toString(16).padStart(2, '0')
  return `#${channel(r)}${channel(g)}${channel(b)}`.toUpperCase()
}

export function toRgbString(color: RgbColor): string {
  const { r, g, b } = color
  return `rgb(${clampChannel(r)}, ${clampChannel(g)}, ${clampChannel(b)})`
}

export function toHslString(color: RgbColor): string {
  const r = clampChannel(color.r) / 255
  const g = clampChannel(color.g) / 255
  const b = clampChannel(color.b) / 255
  const max = Math.max(r, g, b)
  const min = Math.min(r, g, b)
  const delta = max - min
  const l = (max + min) / 2

  if (delta === 0) {
    return `hsl(0, 0%, ${Math.round(l * 100)}%)`
  }

  const s = delta / (1 - Math.abs(2 * l - 1))
  let h = 0
  if (max === r) h = ((g - b) / delta) % 6
  else if (max === g) h = (b - r) / delta + 2
  else h = (r - g) / delta + 4
  h = Math.round(h * 60)
  if (h < 0) h += 360

  return `hsl(${h}, ${Math.round(s * 100)}%, ${Math.round(l * 100)}%)`
}

export interface ColorTokenRow {
  id: string
  label: string
  value: string
}

export function buildColorTokens(color: RgbColor): ColorTokenRow[] {
  return [
    { id: 'hex', label: 'HEX', value: toHex(color) },
    { id: 'rgb', label: 'RGB', value: toRgbString(color) },
    { id: 'hsl', label: 'HSL', value: toHslString(color) },
  ]
}
