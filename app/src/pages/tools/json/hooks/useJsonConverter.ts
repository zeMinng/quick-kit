import { useCallback, useMemo, useState } from 'react'
import { JSON_CONVERT_OPTIONS, type ConvertMode } from '@/pages/tools/json/configs'
import { convertJson, ERROR_MESSAGE } from '@/pages/tools/json/lib/convertJson'

export type JsonConverterState = {
  source: string
  activeMode: ConvertMode
  isBeautify: boolean
}

export type ConversionOutput = {
  result: string
  error: string
}

function buildInputPlaceholder(mode: ConvertMode): string {
  const { description, placeholder } = JSON_CONVERT_OPTIONS[mode]
  return `${description}\n\n${placeholder}`
}

export function computeConversion(
  source: string,
  mode: ConvertMode,
  beautify: boolean,
): ConversionOutput {
  if (!source.trim()) {
    return { result: '', error: '' }
  }

  try {
    return { result: convertJson(mode, source, beautify), error: '' }
  } catch (err) {
    return {
      result: '',
      error: err instanceof Error ? err.message : ERROR_MESSAGE,
    }
  }
}

export type UseJsonConverterReturn = JsonConverterState & {
  setSource: (value: string) => void
  setActiveMode: (mode: ConvertMode) => void
  setIsBeautify: (value: boolean) => void
  result: string
  error: string
  inputPlaceholder: string
  clearInput: () => void
}

export function useJsonConverter(): UseJsonConverterReturn {
  const [source, setSource] = useState('')
  const [activeMode, setActiveMode] = useState<ConvertMode>('format')
  const [isBeautify, setIsBeautify] = useState(true)

  const { result, error } = useMemo(
    () => computeConversion(source, activeMode, isBeautify),
    [source, activeMode, isBeautify],
  )

  const inputPlaceholder = useMemo(() => buildInputPlaceholder(activeMode), [activeMode])

  const clearInput = useCallback(() => setSource(''), [])

  return {
    source,
    setSource,
    activeMode,
    setActiveMode,
    isBeautify,
    setIsBeautify,
    result,
    error,
    inputPlaceholder,
    clearInput,
  }
}
