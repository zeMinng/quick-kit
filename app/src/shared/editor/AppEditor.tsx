import { useCallback, useMemo } from 'react'
import Editor, { type EditorProps } from '@monaco-editor/react'
import type { Monaco } from '@monaco-editor/react'
import { ensureMonacoWorkerEnvironment } from './monacoEnvironment'
import { getEditorOptionsForPreset, type AppEditorPreset } from './editorPresets'

/** Default light theme shipped with Monaco. */
export const DEFAULT_APP_EDITOR_THEME = 'vs'

export interface AppEditorProps extends Omit<EditorProps, 'options' | 'theme'> {
  /** Built-in option bundles for typical tool panes. */
  preset?: AppEditorPreset
  theme?: string
  options?: EditorProps['options']
}

export function AppEditor({
  preset = 'input',
  theme = DEFAULT_APP_EDITOR_THEME,
  options,
  beforeMount,
  ...rest
}: AppEditorProps) {
  const mergedOptions = useMemo(() => getEditorOptionsForPreset(preset, options), [preset, options])

  const handleBeforeMount = useCallback(
    (monaco: Monaco) => {
      ensureMonacoWorkerEnvironment()
      beforeMount?.(monaco)
    },
    [beforeMount],
  )

  return <Editor theme={theme} beforeMount={handleBeforeMount} options={mergedOptions} {...rest} />
}
