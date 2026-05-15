import { ACCEPTED_IMAGE_TYPES, MAX_CANVAS_EDGE } from '@/pages/tools/color-pick/configs'

export function isAcceptedImage(file: File): boolean {
  return (ACCEPTED_IMAGE_TYPES as readonly string[]).includes(file.type)
}

export interface FitDimensions {
  width: number
  height: number
}

export function fitImageDimensions(naturalWidth: number, naturalHeight: number): FitDimensions {
  const longest = Math.max(naturalWidth, naturalHeight)
  if (longest <= MAX_CANVAS_EDGE) {
    return { width: naturalWidth, height: naturalHeight }
  }
  const scale = MAX_CANVAS_EDGE / longest
  return {
    width: Math.round(naturalWidth * scale),
    height: Math.round(naturalHeight * scale),
  }
}

export function canvasPointerToPixel(
  canvas: HTMLCanvasElement,
  clientX: number,
  clientY: number,
): { x: number; y: number } | null {
  const rect = canvas.getBoundingClientRect()
  if (rect.width === 0 || rect.height === 0) return null

  const scaleX = canvas.width / rect.width
  const scaleY = canvas.height / rect.height
  const x = Math.floor((clientX - rect.left) * scaleX)
  const y = Math.floor((clientY - rect.top) * scaleY)

  if (x < 0 || y < 0 || x >= canvas.width || y >= canvas.height) return null
  return { x, y }
}
