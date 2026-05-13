import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Menu, Star, X } from 'lucide-react'
import './ToolHeader.scss'

const APP_NAME = import.meta.env.VITE_APP_TITLE_UP
const GITHUB_REPO = 'zeMinng/quick-kit'
const githubRepoUrl = `https://github.com/${GITHUB_REPO}`

const navLinks = [
  { label: '首页', to: '/' },
  { label: '工具台', to: '/tools' },
  { label: '关于', to: '/#about' },
]

const ToolHeader: React.FC = () => {
  const navigate = useNavigate()
  const [starCount, setStarCount] = useState<string>('-')
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const loadStars = async () => {
      try {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        })
        const data = await res.json()
        setStarCount(
          typeof data.stargazers_count === 'number' ? String(data.stargazers_count) : '-',
        )
      } catch {
        setStarCount('-')
      }
    }

    void loadStars()
  }, [])

  const go = (to: string) => {
    setMenuOpen(false)
    if (to.startsWith('/#')) {
      navigate('/')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          document.querySelector(to.slice(1))?.scrollIntoView({ behavior: 'smooth' })
        })
      })
    } else {
      navigate(to)
    }
  }

  return (
    <header className="tool-header">
      <div className="tool-header__inner">
        <div className="tool-header__brand" onClick={() => go('/')}>
          <div className="tool-header__logo">
            <Box size={18} />
          </div>
          <span className="tool-header__title">{APP_NAME}</span>
        </div>

        <nav className="tool-header__nav" aria-label="主导航">
          {navLinks.map(({ label, to }) => (
            <a
              key={to}
              className="tool-header__nav-link"
              href={to}
              onClick={e => {
                e.preventDefault()
                go(to)
              }}
            >
              {label}
            </a>
          ))}
        </nav>

        <div className="tool-header__meta">
          <div className="tool-header__meta-item tool-header__meta-item--link" onClick={() => window.open(githubRepoUrl)}>
            <Star size={14} />
            <span className="tool-header__meta-text">Stars</span>
            <span className="tool-header__meta-value">{starCount}</span>
          </div>
        </div>

        <button
          type="button"
          className="tool-header__menu-btn"
          aria-expanded={menuOpen}
          aria-controls="tool-header-drawer"
          aria-label={menuOpen ? '关闭菜单' : '打开菜单'}
          onClick={() => setMenuOpen(o => !o)}
        >
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      <div
        id="tool-header-drawer"
        className={`tool-header__drawer${menuOpen ? ' tool-header__drawer--open' : ''}`}
        aria-hidden={!menuOpen}
      >
        {navLinks.map(({ label, to }) => (
          <a
            key={to}
            className="tool-header__drawer-link"
            href={to}
            onClick={e => {
              e.preventDefault()
              go(to)
            }}
          >
            {label}
          </a>
        ))}
      </div>
    </header>
  )
}

export default ToolHeader
