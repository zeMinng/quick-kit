import type { RouteObject } from 'react-router-dom'
import { ErrorThrower } from '@/components/common/ErrorBoundary'
import { NotFound, JsonConverterPage } from './routes.lazy'
import Layout from '@/components/layouts'
import Home from '@/pages/Home/Home'

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
      // {
      //   path: 'tools/json',
      //   element: <JsonConverterPage />,
      // },
    ],
  },
  {
    path: '*',
    element: <NotFound />,
  },
]

export default routes
