import { lazy, Suspense, type FC, type ReactNode } from 'react'
import { Navigate, useParams } from 'react-router-dom'
import { toolEntries } from '@/configs/tools'
import GlobalLoading from '@/components/common/GlobalLoading'
import { ROUTE_TOOLS_INDEX } from './constants'
import { toolPages } from './toolPageRegistry'

const LazyNotFound = lazy(() => import('@/pages/not-found/not-found'))

function ToolShell({ children }: { children: ReactNode }) {
  return <Suspense fallback={<GlobalLoading />}>{children}</Suspense>
}

const ToolRoutePage: FC = () => {
  const { id } = useParams<{ id: string }>()
  const tool = id ? toolEntries.find(t => t.id === id) : undefined
  const Page = id ? toolPages[id] : undefined

  if (import.meta.env.DEV && id && tool?.available && !Page) {
    console.warn(
      `[quick-kit] Tool "${id}" is available in toolEntries but missing from toolPageRegistry. ` +
        'Add a lazy entry in src/pages/Tool/toolPageRegistry.ts.',
    )
  }

  if (!id || !tool) {
    return (
      <ToolShell>
        <LazyNotFound />
      </ToolShell>
    )
  }

  if (!tool.available || !Page) {
    return <Navigate to={ROUTE_TOOLS_INDEX} replace />
  }

  return (
    <ToolShell>
      <Page />
    </ToolShell>
  )
}

export default ToolRoutePage
