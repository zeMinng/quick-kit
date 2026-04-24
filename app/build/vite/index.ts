import react, { reactCompilerPreset } from '@vitejs/plugin-react'
import babel from '@rolldown/plugin-babel'
import tailwindcss from '@tailwindcss/vite'

export function createVitePlugins() {
  return [
    react(),
    babel({ presets: [reactCompilerPreset()] }),
    tailwindcss(),
  ]
}
