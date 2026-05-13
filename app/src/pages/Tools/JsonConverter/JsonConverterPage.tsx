import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Check, Copy, Trash2 } from 'lucide-react'
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

  const toggleBeautifyEscaped = (e: ChangeEvent<HTMLInputElement>) => {
    setIsBeautify(e.target.checked)
    setCopied(false)
    setActionError('')
  }

  const conversion = getJsonConversion({
    mode: activeMode,
    input: source,
    beautify: isBeautify,
  })

  const result = conversion.result
  const error = conversion.error || actionError

  const copyResult = async () => {
    if (conversion.error || !conversion.result) return

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

  const onSourceChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setSource(e.target.value)
    setCopied(false)
    setActionError('')
  }

  return (
    <div className="json-page">
      <header className="json-page__intro">
        <h1 className="json-page__title">JSON 工作台</h1>
        <p className="json-page__lede">
          支持格式化、压缩、转义与反转义；所有处理均在浏览器本地完成，内容不会上传到服务器。
        </p>
      </header>
      <section className="json-tool" aria-label="JSON 转换">
        <div className="json-tool__body">
          <div className="json-tool__toolbar">
            <div className="json-tool__actions">
              {Object.entries(JSON_CONVERT_OPTIONS).map(([key, item]) => (
                <button
                  key={key}
                  type="button"
                  className={activeMode === item.value ? 'btn-primary' : 'btn-outline'}
                  onClick={() => {
                    setActiveMode(item.value)
                    setCopied(false)
                    setActionError('')
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
            <div className="json-tool__toolbar-right">
              <button className="json-tool__icon-btn" type="button" onClick={clearInput}>
                <Trash2 size={14} aria-hidden />
                清空
              </button>
              <label className="json-tool__checkbox-label" htmlFor="escape-beautify">
                <input
                  id="escape-beautify"
                  type="checkbox"
                  className="json-tool__checkbox"
                  checked={isBeautify}
                  onChange={toggleBeautifyEscaped}
                />
                <span>结果美化</span>
              </label>
            </div>
          </div>
          <div className="json-tool__panes">
            <div className="json-tool__pane">
              <div className="json-tool__pane-top">
                <div className="json-tool__label">输入</div>
              </div>
              <textarea
                id="json-source"
                value={source}
                onChange={onSourceChange}
                placeholder={
                  (JSON_CONVERT_OPTIONS[activeMode]?.description ?? '') +
                  '\n' +
                  (JSON_CONVERT_OPTIONS[activeMode]?.placeholder ?? '')
                }
                aria-invalid={!!error}
                className="json-tool__textarea"
                spellCheck={false}
              />
            </div>
            <div className="json-tool__pane">
              <div className="json-tool__pane-top">
                <div className="json-tool__label">输出</div>
              </div>
              <textarea
                id="json-result"
                value={result}
                readOnly
                placeholder="转换结果会显示在这里"
                className="json-tool__textarea json-tool__textarea--readonly"
                spellCheck={false}
              />
            </div>
          </div>
          <div className="json-tool__footer">
            <button type="button" className="btn-outline" onClick={() => void copyResult()} disabled={!result}>
              {copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
              {copied ? '已复制' : '复制结果'}
            </button>
            {error ? <p className="json-tool__error">{error}</p> : null}
          </div>
        </div>
      </section>
    </div>
  )
}

export default JsonConverterPage
