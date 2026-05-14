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

export function getEditorOptionsForPreset(
  preset: AppEditorPreset,
  override?: EditorOptions,
): EditorOptions {
  const base = preset === 'output' ? outputPreset : inputPreset
  return override ? { ...base, ...override } : base
}
