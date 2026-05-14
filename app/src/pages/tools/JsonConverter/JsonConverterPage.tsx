import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import { Braces, Check, Copy, Trash2 } from 'lucide-react'
import { Button, Checkbox, Space, Typography } from 'antd'
import { getJsonConversion, JSON_CONVERT_OPTIONS, type ConvertMode } from './jsonConverter'
import './JsonConverterPage.scss'

const { Text } = Typography

const JsonConverterPage: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ConvertMode>('format')
  const [isBeautify, setIsBeautify] = useState(true)
  const [source, setSource] = useState('')
  const [actionError, setActionError] = useState('')
  const [copied, setCopied] = useState(false)
  const copyTimerRef = useRef<number | null>(null)

  const clearInput = () => {
    setSource('')
    setActionError('')
    setCopied(false)
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

  const onBeautifyChange = (checked: boolean) => {
    setIsBeautify(checked)
    setCopied(false)
    setActionError('')
  }

  const selectMode = (mode: ConvertMode) => {
    setActiveMode(mode)
    setCopied(false)
    setActionError('')
  }

  return (
    <div className="json-page">
      <section className="json-page__hero" aria-labelledby="json-hero-heading">
        <div className="json-page__hero-wrap">
          <div className="json-page__hero-main">
          <div className="json-page__hero-lead">
              <span className="json-page__hero-icon" aria-hidden>
                <Braces size={22} strokeWidth={1.75} />
              </span>
              <div className="json-page__hero-copy">
                <h1 id="json-hero-heading" className="json-page__title">
                  <span className="json-page__title-json">JSON</span>
                  <span className="json-page__title-rest">工作台</span>
                </h1>
                <p className="json-page__lede">
                  格式化、压缩、转义与反转义一站完成；数据留在本机，不经过服务器。
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="json-page__body">
        <div className="json-page__body-inner">
          <section className="json-tool" aria-label="JSON 转换">
            <div className="json-tool__body">
              <div className="json-tool__toolbar">
                <Space wrap size="small" className="json-tool__actions">
                  {Object.entries(JSON_CONVERT_OPTIONS).map(([key, item]) => (
                    <Button
                      key={key}
                      type={activeMode === item.value ? 'primary' : 'default'}
                      variant={activeMode === item.value ? 'solid' : 'outlined'}
                      color="default"
                      onClick={() => selectMode(item.value)}
                    >
                      {item.label}
                    </Button>
                  ))}
                </Space>
                <div className="json-tool__toolbar-right">
                  <Button
                    type="default"
                    variant="outlined"
                    color="default"
                    icon={<Trash2 size={14} aria-hidden />}
                    onClick={clearInput}
                  >
                    清空
                  </Button>
                  <Checkbox
                    checked={isBeautify}
                    onChange={e => onBeautifyChange(e.target.checked)}
                    className="json-tool__beautify"
                  >
                    结果美化
                  </Checkbox>
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
                <Button
                  type="default"
                  variant="outlined"
                  color="default"
                  icon={copied ? <Check size={14} aria-hidden /> : <Copy size={14} aria-hidden />}
                  onClick={() => void copyResult()}
                  disabled={!result}
                >
                  {copied ? '已复制' : '复制结果'}
                </Button>
                {error ? (
                  <Text type="danger" className="json-tool__error">
                    {error}
                  </Text>
                ) : null}
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  )
}

export default JsonConverterPage
