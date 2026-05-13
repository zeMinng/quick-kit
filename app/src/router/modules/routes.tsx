import type { RouteObject } from 'react-router-dom'
import { ErrorThrower } from '@/components/common/ErrorBoundary'
import { NotFound } from './routes.lazy'
import Layout from '@/components/layouts'
import Home from '@/pages/Home/Home'
import ToolConsolePage from '@/pages/Console/Console'
import ToolRoutePage from '@/pages/Tool/[id]'

const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layout />,
    errorElement: <ErrorThrower />,
    children: [
      {
        index: true,
        element: <Home />,
      },
      {
        path: 'tools',
        element: <ToolConsolePage />,
      },
      {
        path: 'tools/:id',
        element: <ToolRoutePage />,
      },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default routes
