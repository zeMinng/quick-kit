import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import type { ColorPickMode } from '@/pages/tools/color-pick/configs'
import { isAcceptedImage, fitImageDimensions, canvasPointerToPixel } from '@/pages/tools/color-pick/lib/canvasImage'
import {
  buildColorTokens,
  parseHex,
  toHex,
  type RgbColor,
} from '@/pages/tools/color-pick/lib/colorFormats'
import {
  CONTRAST_CHECKS,
  contrastRatio,
  evaluateContrast,
  formatRatio,
} from '@/pages/tools/color-pick/lib/contrast'

export type ContrastRole = 'foreground' | 'background'

export function useColorPickWorkbench() {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  const objectUrlRef = useRef<string | null>(null)

  const [activeMode, setActiveMode] = useState<ColorPickMode>('pick')
  const [imageName, setImageName] = useState<string | null>(null)
  const [hasImage, setHasImage] = useState(false)
  const [loadError, setLoadError] = useState('')
  const [pickedColor, setPickedColor] = useState<RgbColor | null>(null)
  const [pickPoint, setPickPoint] = useState<{ x: number; y: number } | null>(null)
  const [foreground, setForeground] = useState<RgbColor | null>(null)
  const [background, setBackground] = useState<RgbColor | null>(null)
  const [contrastTarget, setContrastTarget] = useState<ContrastRole>('foreground')
  const [fgHexInput, setFgHexInput] = useState('')
  const [bgHexInput, setBgHexInput] = useState('')

  const revokeObjectUrl = useCallback(() => {
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
  }, [])

  const drawImageToCanvas = useCallback(
    (source: CanvasImageSource, name: string, naturalWidth: number, naturalHeight: number) => {
      const canvas = canvasRef.current
      if (!canvas) return false

      const { width, height } = fitImageDimensions(naturalWidth, naturalHeight)
      canvas.width = width
      canvas.height = height

      const ctx = canvas.getContext('2d', { willReadFrequently: true })
      if (!ctx) return false

      ctx.clearRect(0, 0, width, height)
      ctx.drawImage(source, 0, 0, width, height)

      setImageName(name)
      setHasImage(true)
      setLoadError('')
      setPickedColor(null)
      setPickPoint(null)
      return true
    },
    [],
  )

  const loadFile = useCallback(
    async (file: File) => {
      if (!isAcceptedImage(file)) {
        setLoadError('仅支持 PNG、JPEG、WebP、GIF 格式。')
        return
      }

      revokeObjectUrl()
      const url = URL.createObjectURL(file)
      objectUrlRef.current = url

      const image = new Image()
      image.decoding = 'async'

      try {
        await new Promise<void>((resolve, reject) => {
          image.onload = () => resolve()
          image.onerror = () => reject(new Error('图像解码失败'))
          image.src = url
        })
      } catch {
        setLoadError('无法读取该图像，请换一张重试。')
        revokeObjectUrl()
        return
      }

      const ok = drawImageToCanvas(image, file.name, image.naturalWidth, image.naturalHeight)
      if (!ok) setLoadError('画布初始化失败，请刷新页面后重试。')
    },
    [drawImageToCanvas, revokeObjectUrl],
  )

  const clearImage = useCallback(() => {
    revokeObjectUrl()
    const canvas = canvasRef.current
    if (canvas) {
      const ctx = canvas.getContext('2d')
      ctx?.clearRect(0, 0, canvas.width, canvas.height)
      canvas.width = 0
      canvas.height = 0
    }
    setImageName(null)
    setHasImage(false)
    setLoadError('')
    setPickedColor(null)
    setPickPoint(null)
    setForeground(null)
    setBackground(null)
    setFgHexInput('')
    setBgHexInput('')
    if (fileInputRef.current) fileInputRef.current.value = ''
  }, [revokeObjectUrl])

  const readPixel = useCallback((x: number, y: number): RgbColor | null => {
    const canvas = canvasRef.current
    if (!canvas || !hasImage) return null

    const ctx = canvas.getContext('2d', { willReadFrequently: true })
    if (!ctx) return null

    const data = ctx.getImageData(x, y, 1, 1).data
    return { r: data[0], g: data[1], b: data[2] }
  }, [hasImage])

  const applyPickedColor = useCallback(
    (color: RgbColor, point: { x: number; y: number }) => {
      setPickedColor(color)
      setPickPoint(point)

      if (activeMode === 'contrast') {
        if (contrastTarget === 'foreground') {
          setForeground(color)
          setFgHexInput(toHex(color))
        } else {
          setBackground(color)
          setBgHexInput(toHex(color))
        }
      }
    },
    [activeMode, contrastTarget],
  )

  const handleCanvasClick = useCallback(
    (event: React.MouseEvent<HTMLCanvasElement>) => {
      if (!hasImage) return
      const canvas = canvasRef.current
      if (!canvas) return

      const point = canvasPointerToPixel(canvas, event.clientX, event.clientY)
      if (!point) return

      const color = readPixel(point.x, point.y)
      if (!color) return
      applyPickedColor(color, point)
    },
    [applyPickedColor, hasImage, readPixel],
  )

  const openFilePicker = useCallback(() => {
    fileInputRef.current?.click()
  }, [])

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0]
      if (file) void loadFile(file)
    },
    [loadFile],
  )

  const handleDrop = useCallback(
    (event: React.DragEvent) => {
      event.preventDefault()
      const file = event.dataTransfer.files?.[0]
      if (file) void loadFile(file)
    },
    [loadFile],
  )

  const handleDragOver = useCallback((event: React.DragEvent) => {
    event.preventDefault()
  }, [])

  const commitHex = useCallback((role: ContrastRole, value: string) => {
    const parsed = parseHex(value)
    if (!parsed) return false
    if (role === 'foreground') {
      setForeground(parsed)
      setFgHexInput(toHex(parsed))
    } else {
      setBackground(parsed)
      setBgHexInput(toHex(parsed))
    }
    return true
  }, [])

  const colorTokens = useMemo(
    () => (pickedColor ? buildColorTokens(pickedColor) : []),
    [pickedColor],
  )

  const ratio = useMemo(() => {
    if (!foreground || !background) return null
    return contrastRatio(foreground, background)
  }, [foreground, background])

  const contrastResults = useMemo(() => {
    if (ratio == null) return []
    return evaluateContrast(ratio, [...CONTRAST_CHECKS])
  }, [ratio])

  const ratioLabel = ratio == null ? '—' : formatRatio(ratio)

  useEffect(() => () => revokeObjectUrl(), [revokeObjectUrl])

  const setActiveModeWithSync = useCallback(
    (mode: ColorPickMode) => {
      setActiveMode(mode)
      if (mode === 'contrast' && pickedColor) {
        setForeground(pickedColor)
        setFgHexInput(toHex(pickedColor))
      }
    },
    [pickedColor],
  )

  return {
    canvasRef,
    fileInputRef,
    activeMode,
    setActiveMode: setActiveModeWithSync,
    imageName,
    hasImage,
    loadError,
    pickedColor,
    pickPoint,
    colorTokens,
    foreground,
    background,
    contrastTarget,
    setContrastTarget,
    fgHexInput,
    setFgHexInput,
    bgHexInput,
    setBgHexInput,
    ratioLabel,
    contrastResults,
    contrastPreview: { foreground, background },
    clearImage,
    openFilePicker,
    handleFileChange,
    handleCanvasClick,
    handleDrop,
    handleDragOver,
    commitHex,
  }
}
