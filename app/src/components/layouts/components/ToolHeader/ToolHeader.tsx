import { useNavigate } from 'react-router-dom'
import { Box } from 'lucide-react'

const APP_NAME = import.meta.env.VITE_APP_TITLE_UP

const ToolHeader: React.FC = () => {
  const navigate = useNavigate()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[var(--app-border)] bg-[color:color-mix(in_oklab,var(--app-bg)_85%,transparent)] backdrop-blur-md">
      <div className="container flex h-16 items-center justify-between px-4 md:px-8 max-w-7xl mx-auto">
        <div className="flex items-center gap-6">
          <div 
            className="flex items-center gap-2.5 cursor-pointer group" 
            onClick={() => navigate('/')}
          >
            <div className="bg-[var(--app-primary)] p-1.5 rounded-xl group-hover:rotate-12 transition-transform duration-300 shadow-[var(--app-shadow-sm)]">
              <Box className="h-5 w-5 text-[var(--app-primary-fg)]" />
            </div>
            <span className="font-bold text-xl tracking-tight text-[var(--app-fg)]">{APP_NAME}</span>
          </div>
          
          <nav className="hidden md:flex items-center gap-6 text-sm font-medium text-[var(--app-muted-fg)]">
            <button className="hover:text-[var(--app-primary)] transition-colors">配置</button>
          </nav>
        </div>

        <div className="flex items-center gap-6">
          <span className="text-sm text-[var(--app-muted-fg)]">最近更新: {__BUILD_TIME__}</span>
        </div>
      </div>
    </header>
  )
}

export default ToolHeader
