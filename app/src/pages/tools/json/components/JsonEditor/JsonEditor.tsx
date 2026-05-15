import type { ReactNode } from 'react'
import { Button, Checkbox, Tooltip } from 'antd'
import {
  AlignLeft,
  Check,
  Copy,
  Link2,
  Minimize2,
  Trash2,
  Unlink,
} from 'lucide-react'
import {
  JSON_CONVERT_OPTIONS,
  type ConvertMode,
  type ConvertType,
} from '@/pages/tools/json/configs'
import { useJsonConverter } from '@/pages/tools/json/hooks/useJsonConverter'
import { useCopyFeedback } from '@/hooks/useCopyFeedback'
import { AppEditor } from '@/shared/editor'
import './JsonEditor.scss'

const MODE_ICONS: Record<ConvertMode, ReactNode> = {
  format: <AlignLeft size={15} strokeWidth={2} aria-hidden />,
  minify: <Minimize2 size={15} strokeWidth={2} aria-hidden />,
  escape: <Link2 size={15} strokeWidth={2} aria-hidden />,
  unescape: <Unlink size={15} strokeWidth={2} aria-hidden />,
}

const MODES = Object.values(JSON_CONVERT_OPTIONS) as ConvertType[]

interface ToolbarProps {
  activeMode: ConvertMode
  onModeChange: (mode: ConvertMode) => void
  isBeautify: boolean
  onBeautifyChange: (value: boolean) => void
  onClear: () => void
}

const ConverterToolBar: React.FC<ToolbarProps> = ({
  activeMode,
  onModeChange,
  isBeautify,
  onBeautifyChange,
  onClear,
}) => (
  <div className="json-tool__toolbar-shell">
    <div className="json-tool__toolbar">
      <div className="json-tool__mode-tabs" role="tablist" aria-label="JSON 转换模式">
        {MODES.map(item => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={activeMode === item.value}
            className={`json-tool__mode-tab${activeMode === item.value ? ' json-tool__mode-tab--active' : ''}`}
            onClick={() => onModeChange(item.value)}
          >
            <span className="json-tool__mode-tab-icon">{MODE_ICONS[item.value]}</span>
            <span className="json-tool__mode-tab-label">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="json-tool__toolbar-right">
        <Tooltip title="清空输入区">
          <Button
            type="default"
            variant="outlined"
            color="default"
            icon={<Trash2 size={14} aria-hidden />}
            onClick={onClear}
          >
            清空
          </Button>
        </Tooltip>
        <Checkbox
          checked={isBeautify}
          onChange={e => onBeautifyChange(e.target.checked)}
          className="json-tool__beautify"
        >
          结果美化
        </Checkbox>
      </div>
    </div>
  </div>
)

export const JsonEditor: React.FC = () => {
  const {
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
  } = useJsonConverter()
  const { copied: copiedOut, copy, reset: resetCopy } = useCopyFeedback()

  const handleClear = () => {
    clearInput()
    resetCopy()
  }

  const copyOutput = () => {
    if (result) void copy(result)
  }

  return (
    <section className="json-page__body">
      <div className="json-page__body-inner">
        <div className="json-tool">
          <div className="json-tool__body">
            <ConverterToolBar
              activeMode={activeMode}
              onModeChange={setActiveMode}
              isBeautify={isBeautify}
              onBeautifyChange={setIsBeautify}
              onClear={handleClear}
            />

            <div className="json-tool__panes">
              <div className="json-tool__pane json-tool__pane--in">
                <div className="json-tool__pane-top">
                  <span className="json-tool__badge json-tool__badge--in" aria-hidden>
                    输入
                  </span>
                  <span className="json-tool__pane-caption">在此编辑或粘贴原始内容</span>
                </div>
                <div className="json-tool__editor json-tool__editor--in">
                  <AppEditor
                    preset="input"
                    rootClassName="json-tool__monaco"
                    value={source}
                    onChange={v => setSource(v ?? '')}
                    options={{ placeholder: inputPlaceholder }}
                  />
                </div>
              </div>

              <div className="json-tool__pane json-tool__pane--out">
                <div className="json-tool__pane-top">
                  <span className="json-tool__badge json-tool__badge--out" aria-hidden>
                    输出
                  </span>
                  <span className="json-tool__pane-caption">实时预览转换结果</span>
                  <div className="json-tool__pane-actions">
                    <Tooltip title={copiedOut ? '已复制' : '复制全部'}>
                      <Button
                        type="text"
                        size="small"
                        disabled={!result}
                        icon={
                          copiedOut ? (
                            <Check size={16} className="json-tool__copy-icon--ok" aria-hidden />
                          ) : (
                            <Copy size={16} aria-hidden />
                          )
                        }
                        onClick={copyOutput}
                        aria-label="复制输出"
                      />
                    </Tooltip>
                  </div>
                </div>
                <div className="json-tool__editor json-tool__editor--out">
                  <AppEditor
                    preset="output"
                    rootClassName="json-tool__monaco"
                    value={result}
                  />
                </div>
              </div>
            </div>

            {error ? (
              <div className="json-tool__alert" role="alert">
                {error}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
