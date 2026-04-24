import { Suspense } from 'react'
import { RouterProvider } from 'react-router-dom'
import { ConfigProvider, App as AntdApp } from 'antd'
import zhCN from 'antd/es/locale/zh_CN'
import { router } from './router'
import ErrorBoundary from '@/components/common/ErrorBoundary'
import GlobalLoading from '@/components/common/GlobalLoading'
// const LazyComponent = React.lazy(() => new Promise(() => {}))

function App() {
  return (
    <ConfigProvider
      locale={zhCN}
    >
      <AntdApp>
        <ErrorBoundary>
          <div className="app">
            <Suspense fallback={<GlobalLoading />}>
              {/* <LazyComponent /> */}
              <RouterProvider router={router} />
            </Suspense>
          </div>
        </ErrorBoundary>
      </AntdApp>
    </ConfigProvider>
  )
}

export default App
