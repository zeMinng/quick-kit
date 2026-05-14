import EditorWorker from 'monaco-editor/esm/vs/editor/editor.worker?worker'
import JsonWorker from 'monaco-editor/esm/vs/language/json/json.worker?worker'

let configured = false

/**
 * Registers Monaco worker constructors for Vite (ESM + `?worker`).
 * Safe to call multiple times; runs once.
 */
export function ensureMonacoWorkerEnvironment(): void {
  if (configured) return
  configured = true

  const host = globalThis as typeof globalThis & {
    MonacoEnvironment?: { getWorker: (workerId: string, label: string) => Worker }
  }

  host.MonacoEnvironment = {
    getWorker(_workerId, label) {
      if (label === 'json') {
        return new JsonWorker()
      }
      return new EditorWorker()
    },
  }
}
