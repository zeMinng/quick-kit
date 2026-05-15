import { useCallback } from 'react'
import Editor, { type EditorProps, type Monaco } from '@monaco-editor/react'
import { getEditorOptionsForPreset, type AppEditorPreset } from './editorPresets'
import './AppEditor.scss'

export const DEFAULT_APP_EDITOR_THEME = 'active4d'

export interface AppEditorProps extends Omit<EditorProps, 'options' | 'theme'> {
  preset?: AppEditorPreset
  theme?: string
  options?: EditorProps['options']
  /** Applied to the outer wrapper (layout, radius, focus ring). */
  rootClassName?: string
}

export const AppEditor: React.FC<AppEditorProps> = ({
  preset = 'input',
  theme = DEFAULT_APP_EDITOR_THEME,
  options,
  beforeMount,
  rootClassName,
  defaultLanguage = 'json',
  height = '100%',
  ...rest
}: AppEditorProps) => {
  const handleBeforeMount = useCallback(
    (monaco: Monaco) => {
      beforeMount?.(monaco)
    },
    [beforeMount],
  )

  const rootClass = ['app-editor', rootClassName].filter(Boolean).join(' ')

  return (
    <div className={rootClass}>
      <Editor
        theme={theme}
        defaultLanguage={defaultLanguage}
        height={height}
        options={getEditorOptionsForPreset(preset, options)}
        beforeMount={handleBeforeMount}
        {...rest}
      />
    </div>
  )
}
