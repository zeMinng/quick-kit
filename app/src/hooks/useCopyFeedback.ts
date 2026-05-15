import { useCallback, useEffect, useRef, useState } from 'react'

const DEFAULT_RESET_MS = 2000

export function useCopyFeedback(resetMs = DEFAULT_RESET_MS) {
  const [copied, setCopied] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | undefined>(undefined)

  const copy = useCallback(
    async (text: string) => {
      if (!text) return false
      try {
        await navigator.clipboard.writeText(text)
        setCopied(true)
        if (timerRef.current) clearTimeout(timerRef.current)
        timerRef.current = setTimeout(() => setCopied(false), resetMs)
        return true
      } catch {
        setCopied(false)
        return false
      }
    },
    [resetMs],
  )

  const reset = useCallback(() => {
    setCopied(false)
    if (timerRef.current) clearTimeout(timerRef.current)
  }, [])

  useEffect(
    () => () => {
      if (timerRef.current) clearTimeout(timerRef.current)
    },
    [],
  )

  return { copied, copy, reset }
}
