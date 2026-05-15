import { useCallback, } from 'react'
import Editor, { type EditorProps, type Monaco } from '@monaco-editor/react'
import { getEditorOptionsForPreset, type AppEditorPreset } from './editorPresets'

export const DEFAULT_APP_EDITOR_THEME = 'active4d'

export interface AppEditorProps extends Omit<EditorProps, 'options' | 'theme'> {
  preset?: AppEditorPreset
  theme?: string
  options?: EditorProps['options']
}

export const AppEditor: React.FC<AppEditorProps> = ({
  preset = 'input',
  theme = DEFAULT_APP_EDITOR_THEME,
  options,
  beforeMount,
  ...rest
}: AppEditorProps) => {
  const handleBeforeMount = useCallback(
    (monaco: Monaco) => {
      beforeMount?.(monaco)
    },
    [beforeMount],
  )

  return (
    <Editor
      theme={theme}
      options={getEditorOptionsForPreset(preset, options)}
      beforeMount={handleBeforeMount}
      {...rest}
    />
  )
}
