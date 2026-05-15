import type { RgbColor } from '@/pages/tools/color-pick/lib/colorFormats'

function channelLuminance(channel: number): number {
  const c = channel / 255
  return c <= 0.03928 ? c / 12.92 : ((c + 0.055) / 1.055) ** 2.4
}

export function relativeLuminance({ r, g, b }: RgbColor): number {
  return 0.2126 * channelLuminance(r) + 0.7152 * channelLuminance(g) + 0.0722 * channelLuminance(b)
}

export function contrastRatio(foreground: RgbColor, background: RgbColor): number {
  const l1 = relativeLuminance(foreground)
  const l2 = relativeLuminance(background)
  const lighter = Math.max(l1, l2)
  const darker = Math.min(l1, l2)
  return (lighter + 0.05) / (darker + 0.05)
}

export interface ContrastCheck {
  id: string
  label: string
  threshold: number
  pass: boolean
}

export function evaluateContrast(
  ratio: number,
  checks: { id: string; label: string; threshold: number }[],
): ContrastCheck[] {
  return checks.map(item => ({
    ...item,
    pass: ratio >= item.threshold,
  }))
}

export const CONTRAST_CHECKS = [
  { id: 'aa-normal', label: 'AA · 正文', threshold: 4.5 },
  { id: 'aa-large', label: 'AA · 大字号', threshold: 3 },
  { id: 'aaa-normal', label: 'AAA · 正文', threshold: 7 },
  { id: 'aaa-large', label: 'AAA · 大字号', threshold: 4.5 },
] as const

export function formatRatio(ratio: number): string {
  return `${ratio.toFixed(2)}:1`
}
