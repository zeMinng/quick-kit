import { lazy, type FC, type LazyExoticComponent } from 'react'

/**
 * Lazy tool UI keyed by `ToolEntry.id` in `src/configs/tools/index.ts`.
 *
 * ## Adding a tool
 *
 * 1. Add a `ToolEntry` in `src/configs/tools/index.ts` (set `href` to `/tools/<id>`).
 * 2. Implement the page (convention: `src/pages/tools/<id>/…`).
 * 3. Register the same `<id>` here with `lazy(() => import('…'))`.
 *
 * The host route `tools/:id` (`src/pages/tools/[id].tsx`) resolves the URL segment
 * against this map and `toolEntries`.
 */
const registry = {
  json: lazy(() => import('@/pages/tools/json')),
} as const satisfies Record<string, LazyExoticComponent<FC>>

export type RegisteredToolPageId = keyof typeof registry

/** Runtime lookup by URL `:id` segment. */
export const toolPages: Record<string, LazyExoticComponent<FC>> = registry
