import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import Editor from '@monaco-editor/react'
import { Braces, Check, Copy, Trash2 } from 'lucide-react'
import { Button, Checkbox, Space, Typography } from 'antd'
import { 
  EditorInputCodeOptions,
  EditorOutputCodeOptions,
  JSON_CONVERT_OPTIONS,
  getJsonConversion,
  type ConvertMode
} from './jsonConverter'
import './converter.scss'

const ConverterToolBar: React.FC = () => {
  const [activeMode, setActiveMode] = useState<ConvertMode>('format')
  const [isBeautify, setIsBeautify] = useState(true)
  const [source, setSource] = useState('')
  const selectMode = (mode: ConvertMode) => {
    setActiveMode(mode)
  }

  const clearInput = () => {
    // setSource('')
    // setActionError('')
    // setCopied(false)
  }

  const onBeautifyChange = (checked: boolean) => {
    // setIsBeautify(checked)
    // setCopied(false)
    // setActionError('')
  }

  return (
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
  )
}

const ConverterToolEditor: React.FC = () => {
  const [inputCode, _setInputCode] = useState('')
  const [outputCode, _setOutputCode] = useState('')
  // const [result, setResult] = useState('')
  // const [error, setError] = useState('')
  const leftEditorRef = useRef<any>(null)

  return (
    <div className="json-tool__panes">
      <div className="json-tool__pane">
        <div className="json-tool__pane-top">
          <div className="json-tool__label">输入</div>
        </div>
        <div className="json-tool__editor">
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="active4d"
            value={inputCode}
            onMount={(editor) => (leftEditorRef.current = editor)}
            options={EditorInputCodeOptions}
          />
        </div>
      </div>
      <div className="json-tool__pane">
        <div className="json-tool__pane-top">
          <div className="json-tool__label">输出</div>
        </div>
        <div className="json-tool__editor">
          <Editor
            height="100%"
            defaultLanguage="json"
            theme="active4d"
            value={outputCode}
            options={EditorOutputCodeOptions}
          />
        </div>
      </div>
    </div>
  )
}

const Converter: React.FC = () => {
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

      <section className="json-page__body">
        <div className="json-page__body-inner">
          <div className="json-tool">
            <div className="json-tool__body">
              <ConverterToolBar />

              <ConverterToolEditor />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Converter