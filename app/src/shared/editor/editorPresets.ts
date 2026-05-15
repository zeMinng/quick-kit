import type { EditorProps } from '@monaco-editor/react'

export type AppEditorPreset = 'input' | 'output'

type EditorOptions = NonNullable<EditorProps['options']>

const baseOptions: EditorOptions = {
  fontSize: 14,
  automaticLayout: true,
  minimap: { enabled: false },
  scrollBeyondLastLine: false,
  lineNumbers: 'on',
  folding: true,
  bracketPairColorization: { enabled: true },
  guides: {
    indentation: true,
    bracketPairs: true,
  },
  scrollbar: { verticalScrollbarSize: 8, horizontalScrollbarSize: 8 },
}

const inputPreset: EditorOptions = {
  ...baseOptions,
  formatOnPaste: true,
  tabSize: 2,
}

const outputPreset: EditorOptions = {
  ...baseOptions,
  readOnly: true,
  domReadOnly: true,
  cursorStyle: 'line',
  contextmenu: true,
  lineDecorationsWidth: 10,
  glyphMargin: false,
  links: false,
}

/**
 * 获取编辑器配置选项
 * @param preset input | output 来区分是输入和输出，以便设置不同的配置
 * @param override 允许覆盖预设的默认配置
 * @returns 根据预设和覆盖选项生成的编辑器配置对象
 */
export function getEditorOptionsForPreset(
  preset: AppEditorPreset,
  override?: EditorOptions,
): EditorOptions {
  const base = preset === 'output' ? outputPreset : inputPreset
  return override ? { ...base, ...override } : base
}
