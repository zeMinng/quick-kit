import { useEffect, useRef, useState } from 'react'
import { Check, Copy, Trash2 } from 'lucide-react'
import { Button } from '@workspace/ui/components/button'
import { Checkbox } from '@workspace/ui/components/checkbox'
import { Textarea } from '@workspace/ui/components/textarea'
import { getJsonConversion, JSON_CONVERT_OPTIONS, type ConvertMode } from './jsonConverter'
import './JsonConverterPage.scss'

const JsonConverterPage: React.FC = () => {
  // convert mode.
  const [activeMode, setActiveMode] = useState<ConvertMode>('format')
  // beautify the results improve readability.
  const [isBeautify, setIsBeautify] = useState(true)
  // entered information.
  const [source, setSource] = useState('')
  // action error message (e.g. clipboard).
  const [actionError, setActionError] = useState('')
  // copy status.
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<number | null>(null)

  const clearInput = () => {
    setSource('')
    setActionError('')
    setCopied(false)
  }

  const toggleBeautifyEscaped = (checked: boolean | 'indeterminate') => {
    const next = checked === true
    setIsBeautify(next)
    setCopied(false)
    setActionError('')
  }

  const copyResult = async () => {
    if (conversion.error || !conversion.result) return

    if (!result) return

    try {
      await navigator.clipboard.writeText(conversion.result)
      setCopied(true)
      if (copyTimerRef.current) window.clearTimeout(copyTimerRef.current)
      copyTimerRef.current = window.setTimeout(() => setCopied(false), 1200)
      setActionError('')
    } catch {
      setActionError('复制失败，请检查浏览器剪贴板权限')
    }
  }

  useEffect(() => {
    return () => {
      if (copyTimerRef.current) {
        window.clearTimeout(copyTimerRef.current)
      }
    }
  }, [])

  const conversion = getJsonConversion({
    mode: activeMode,
    input: source,
    beautify: isBeautify,
  })

  const result = conversion.result
  const error = conversion.error || actionError

  return (
    <div className="home-page">
      <section className="flex flex-col gap-3 pt-8 pb-2">
        <h1 className="text-2xl md:text-3xl font-black tracking-tight text-slate-900 dark:text-white">
          JSON 转换器
        </h1>
        <p className="text-sm text-slate-500 dark:text-slate-400">
          支持格式化、压缩、转义与反转义，所有处理均在本地完成。
        </p>
      </section>
      <section className="json-tool">
        <div className="json-tool__body">
          <div className="json-tool__toolbar">
            <div className="json-tool__actions">
              {Object.entries(JSON_CONVERT_OPTIONS).map(([key, item]) => (
                <Button
                  key={key}
                  variant={activeMode === item.value ? 'default' : 'outline'}
                  type="button"
                  onClick={() => {
                    setActiveMode(item.value)
                    setCopied(false)
                    setActionError('')
                  }}
                >
                  {item.label}
                </Button>
              ))}
            </div>
            <div className="json-tool__toolbar-right">
              <button className="json-tool__beautify" type="button" onClick={clearInput}>
                <Trash2 size={14} />
                清空
              </button>
              <label className="json-tool__beautify" htmlFor="escape-beautify">
                <Checkbox id="escape-beautify" checked={isBeautify} onCheckedChange={toggleBeautifyEscaped} />
                <span>结果美化</span>
              </label>
            </div>
          </div>
          <div className="json-tool__panes">
            <div className="json-tool__pane">
              <div className="json-tool__pane-top">
                <div className="label">输入</div>
              </div>
              <Textarea
                id="json-source"
                value={source}
                onChange={(event) => {
                  setSource(event.target.value)
                  setCopied(false)
                  setActionError('')
                }}
                placeholder={
                  JSON_CONVERT_OPTIONS[activeMode]?.description + '\n' + JSON_CONVERT_OPTIONS[activeMode]?.placeholder
                }
                aria-invalid={!!error}
                className="json-tool__textarea"
              />
            </div>
            <div className="json-tool__pane">
              <div className="json-tool__pane-top">
                <div className="label">输出</div>
              </div>
              <Textarea
                id="json-result"
                value={result}
                readOnly
                placeholder="转换结果会显示在这里"
                className="json-tool__textarea"
              />
            </div>
          </div>
          <div className="json-tool__footer">
            <Button variant="outline" type="button" onClick={copyResult} disabled={!result}>
              {copied ? <Check size={14} /> : <Copy size={14} />}
              {copied ? '已复制' : '复制结果'}
            </Button>
            {error ? <p className="json-tool__error">{error}</p> : null}
          </div>
        </div>
      </section>
    </div>
  )
}

export default JsonConverterPage
