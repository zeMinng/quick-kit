import { useEffect, useRef, useState } from 'react'
import type { ChangeEvent } from 'react'
import Editor from '@monaco-editor/react'
import { Braces, Check, Copy, Trash2 } from 'lucide-react'
import { Button, Checkbox, Space, Typography } from 'antd'
import { 
  // EditorInputCodeOptions,
  // EditorOutputCodeOptions,
  JSON_CONVERT_OPTIONS,
  getJsonConversion,
  type ConvertMode
} from '../jsonConversion'
import { AppEditor } from '@/shared/editor'
import './json-editor.scss'

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

export const JsonEditor: React.FC = () => {
  return (
    <section className="json-page__body">
      <div className="json-page__body-inner">
        <div className="json-tool">
          <div className="json-tool__body">
            <ConverterToolBar />

            <AppEditor />
          </div>
        </div>
      </div>
    </section>
  )
}
