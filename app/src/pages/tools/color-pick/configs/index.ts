export type ColorPickMode = 'pick' | 'contrast'

export interface ColorPickModeOption {
  label: string
  value: ColorPickMode
  description: string
}

export const COLOR_PICK_MODES: Record<ColorPickMode, ColorPickModeOption> = {
  pick: {
    label: '吸管取样',
    value: 'pick',
    description: '在预览画布上点击像素，生成可复制的色值标记。',
  },
  contrast: {
    label: '对比度',
    value: 'contrast',
    description: '以前景 / 背景色计算 WCAG 对比度与 AA、AAA 达标情况。',
  },
}

export const ACCEPTED_IMAGE_TYPES = ['image/png', 'image/jpeg', 'image/webp', 'image/gif'] as const

export const MAX_CANVAS_EDGE = 1600
