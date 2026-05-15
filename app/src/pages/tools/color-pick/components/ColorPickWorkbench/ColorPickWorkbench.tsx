import { useState, type ReactNode } from 'react'
import { Button, Tooltip } from 'antd'
import { Check, Copy, Droplet, ImageUp, Pipette, Trash2, Upload } from 'lucide-react'
import { COLOR_PICK_MODES, type ColorPickMode } from '@/pages/tools/color-pick/configs'
import { useColorPickWorkbench } from '@/pages/tools/color-pick/hooks/useColorPickWorkbench'
import { toHex } from '@/pages/tools/color-pick/lib/colorFormats'
import { useCopyFeedback } from '@/hooks/useCopyFeedback'
import './ColorPickWorkbench.scss'

const MODES = Object.values(COLOR_PICK_MODES)

const MODE_ICONS: Record<ColorPickMode, ReactNode> = {
  pick: <Pipette size={15} strokeWidth={2} aria-hidden />,
  contrast: <Droplet size={15} strokeWidth={2} aria-hidden />,
}

interface ToolbarProps {
  activeMode: ColorPickMode
  onModeChange: (mode: ColorPickMode) => void
  hasImage: boolean
  onOpenFile: () => void
  onClear: () => void
}

const WorkbenchToolbar: React.FC<ToolbarProps> = ({
  activeMode,
  onModeChange,
  hasImage,
  onOpenFile,
  onClear,
}) => (
  <div className="color-pick-tool__toolbar-shell">
    <div className="color-pick-tool__toolbar">
      <div className="color-pick-tool__mode-tabs" role="tablist" aria-label="色彩工具模式">
        {MODES.map(item => (
          <button
            key={item.value}
            type="button"
            role="tab"
            aria-selected={activeMode === item.value}
            className={`color-pick-tool__mode-tab${activeMode === item.value ? ' color-pick-tool__mode-tab--active' : ''}`}
            onClick={() => onModeChange(item.value)}
          >
            <span className="color-pick-tool__mode-tab-icon">{MODE_ICONS[item.value]}</span>
            <span className="color-pick-tool__mode-tab-label">{item.label}</span>
          </button>
        ))}
      </div>
      <div className="color-pick-tool__toolbar-right">
        <Tooltip title="选择本地图片">
          <Button
            type="default"
            variant="outlined"
            icon={<Upload size={14} aria-hidden />}
            onClick={onOpenFile}
          >
            载入图片
          </Button>
        </Tooltip>
        <Tooltip title="移除当前图片">
          <Button
            type="default"
            variant="outlined"
            disabled={!hasImage}
            icon={<Trash2 size={14} aria-hidden />}
            onClick={onClear}
          >
            清空
          </Button>
        </Tooltip>
      </div>
    </div>
  </div>
)

interface TokenCopyRowProps {
  label: string
  value: string
  copied: boolean
  onCopy: () => void
}

const TokenCopyRow: React.FC<TokenCopyRowProps> = ({ label, value, copied, onCopy }) => (
  <li className="color-pick-tool__token-row">
    <span className="color-pick-tool__token-label">{label}</span>
    <code className="color-pick-tool__token-value">{value}</code>
    <Tooltip title={copied ? '已复制' : '复制'}>
      <Button
        type="text"
        size="small"
        icon={
          copied ? (
            <Check size={16} className="color-pick-tool__copy-icon--ok" aria-hidden />
          ) : (
            <Copy size={16} aria-hidden />
          )
        }
        onClick={onCopy}
        aria-label={`复制 ${label}`}
      />
    </Tooltip>
  </li>
)

export const ColorPickWorkbench: React.FC = () => {
  const {
    canvasRef,
    fileInputRef,
    activeMode,
    setActiveMode,
    imageName,
    hasImage,
    loadError,
    pickedColor,
    pickPoint,
    colorTokens,
    contrastTarget,
    setContrastTarget,
    fgHexInput,
    setFgHexInput,
    bgHexInput,
    setBgHexInput,
    ratioLabel,
    contrastResults,
    contrastPreview,
    clearImage,
    openFilePicker,
    handleFileChange,
    handleCanvasClick,
    handleDrop,
    handleDragOver,
    commitHex,
  } = useColorPickWorkbench()

  const { copy, reset: resetCopy } = useCopyFeedback()
  const [copiedRowId, setCopiedRowId] = useState<string | null>(null)

  const handleClear = () => {
    clearImage()
    resetCopy()
    setCopiedRowId(null)
  }

  const handleCopyToken = (id: string, value: string) => {
    void copy(value).then(ok => {
      if (!ok) return
      setCopiedRowId(id)
      window.setTimeout(() => setCopiedRowId(current => (current === id ? null : current)), 2000)
    })
  }

  const modeHint = COLOR_PICK_MODES[activeMode].description
  const swatchColor = pickedColor ? toHex(pickedColor) : 'transparent'

  return (
    <section className="color-pick-page__body">
      <div className="color-pick-page__body-inner">
        <div className="color-pick-tool">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/png,image/jpeg,image/webp,image/gif"
            hidden
            onChange={handleFileChange}
          />

          <div className="color-pick-tool__body">
            <WorkbenchToolbar
              activeMode={activeMode}
              onModeChange={setActiveMode}
              hasImage={hasImage}
              onOpenFile={openFilePicker}
              onClear={handleClear}
            />

            <div className="color-pick-tool__panes">
              <div className="color-pick-tool__pane">
                <div className="color-pick-tool__pane-top">
                  <span className="color-pick-tool__badge" aria-hidden>
                    预览
                  </span>
                  <span className="color-pick-tool__pane-caption">
                    {hasImage ? (imageName ?? '已载入') : '拖放或载入图片，在画布上点击取样'}
                  </span>
                </div>

                <div
                  className={`color-pick-tool__canvas-wrap${hasImage ? '' : ' color-pick-tool__canvas-wrap--empty'}`}
                  onDrop={handleDrop}
                  onDragOver={handleDragOver}
                >
                  <canvas
                    ref={canvasRef}
                    className="color-pick-tool__canvas"
                    style={{ display: hasImage ? 'block' : 'none' }}
                    onClick={handleCanvasClick}
                    role="img"
                    aria-label="图像预览画布，点击以取样颜色"
                  />
                  {!hasImage ? (
                    <div className="color-pick-tool__dropzone">
                      <ImageUp size={28} strokeWidth={1.5} aria-hidden />
                      <p className="color-pick-tool__dropzone-title">拖放图片到此处</p>
                      <p className="color-pick-tool__dropzone-hint">
                        支持 PNG、JPEG、WebP、GIF；处理仅在浏览器本地完成。
                      </p>
                      <Button type="primary" icon={<Upload size={14} aria-hidden />} onClick={openFilePicker}>
                        选择文件
                      </Button>
                    </div>
                  ) : null}
                  {hasImage && pickPoint ? (
                    <span className="color-pick-tool__canvas-meta" aria-live="polite">
                      {pickPoint.x}, {pickPoint.y}
                      {pickedColor ? ` · ${toHex(pickedColor)}` : ''}
                    </span>
                  ) : null}
                </div>
              </div>

              <div className="color-pick-tool__pane">
                <div className="color-pick-tool__pane-top">
                  <span className="color-pick-tool__badge" aria-hidden>
                    {activeMode === 'pick' ? '色值' : '对比度'}
                  </span>
                  <span className="color-pick-tool__pane-caption">{modeHint}</span>
                </div>

                {activeMode === 'pick' ? (
                  pickedColor ? (
                    <>
                      <div
                        className="color-pick-tool__swatch"
                        style={{ backgroundColor: swatchColor }}
                        aria-hidden
                      />
                      <ul className="color-pick-tool__token-list">
                        {colorTokens.map(row => (
                          <TokenCopyRow
                            key={row.id}
                            label={row.label}
                            value={row.value}
                            copied={copiedRowId === row.id}
                            onCopy={() => handleCopyToken(row.id, row.value)}
                          />
                        ))}
                      </ul>
                    </>
                  ) : (
                    <p className="color-pick-tool__empty">载入图片后，在左侧画布点击任意像素以生成色值。</p>
                  )
                ) : (
                  <>
                    <div className="color-pick-tool__contrast-targets" role="group" aria-label="取样目标">
                      <button
                        type="button"
                        className={`color-pick-tool__contrast-target${contrastTarget === 'foreground' ? ' color-pick-tool__contrast-target--active' : ''}`}
                        onClick={() => setContrastTarget('foreground')}
                      >
                        前景色
                      </button>
                      <button
                        type="button"
                        className={`color-pick-tool__contrast-target${contrastTarget === 'background' ? ' color-pick-tool__contrast-target--active' : ''}`}
                        onClick={() => setContrastTarget('background')}
                      >
                        背景色
                      </button>
                    </div>

                    <div className="color-pick-tool__hex-fields">
                      <label className="color-pick-tool__hex-field">
                        <span className="color-pick-tool__hex-field-label">前景</span>
                        <input
                          className="color-pick-tool__hex-input"
                          value={fgHexInput}
                          placeholder="#000000"
                          spellCheck={false}
                          onChange={e => setFgHexInput(e.target.value)}
                          onBlur={() => commitHex('foreground', fgHexInput)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') commitHex('foreground', fgHexInput)
                          }}
                        />
                      </label>
                      <label className="color-pick-tool__hex-field">
                        <span className="color-pick-tool__hex-field-label">背景</span>
                        <input
                          className="color-pick-tool__hex-input"
                          value={bgHexInput}
                          placeholder="#FFFFFF"
                          spellCheck={false}
                          onChange={e => setBgHexInput(e.target.value)}
                          onBlur={() => commitHex('background', bgHexInput)}
                          onKeyDown={e => {
                            if (e.key === 'Enter') commitHex('background', bgHexInput)
                          }}
                        />
                      </label>
                    </div>

                    <div className="color-pick-tool__ratio-card">
                      <div className="color-pick-tool__ratio-head">
                        <p className="color-pick-tool__ratio-value">{ratioLabel}</p>
                        <div className="color-pick-tool__ratio-preview" aria-hidden>
                          <span
                            className="color-pick-tool__ratio-swatch"
                            style={{
                              backgroundColor: contrastPreview.foreground
                                ? toHex(contrastPreview.foreground)
                                : 'var(--color-hairline)',
                            }}
                          />
                          <span
                            className="color-pick-tool__ratio-swatch"
                            style={{
                              backgroundColor: contrastPreview.background
                                ? toHex(contrastPreview.background)
                                : 'var(--color-canvas)',
                            }}
                          />
                        </div>
                      </div>
                      {contrastResults.length > 0 ? (
                        <ul className="color-pick-tool__checks">
                          {contrastResults.map(item => (
                            <li key={item.id} className="color-pick-tool__check">
                              <span className="color-pick-tool__check-label">{item.label}</span>
                              <span
                                className={`color-pick-tool__check-status color-pick-tool__check-status--${item.pass ? 'pass' : 'fail'}`}
                              >
                                {item.pass ? '通过' : '未达标'}
                              </span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <p className="color-pick-tool__empty">
                          在画布上分别取样前景与背景，或直接输入 HEX 色值。
                        </p>
                      )}
                    </div>
                  </>
                )}
              </div>
            </div>

            {loadError ? (
              <div className="color-pick-tool__alert" role="alert">
                {loadError}
              </div>
            ) : null}
          </div>
        </div>
      </div>
    </section>
  )
}
