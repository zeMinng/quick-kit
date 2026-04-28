import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Clock3, Star } from 'lucide-react'
import './ToolHeader.scss'

const APP_NAME = import.meta.env.VITE_APP_TITLE_UP
const GITHUB_REPO = 'zeMinng/quick-kit'
const githubRepoUrl = `https://github.com/${GITHUB_REPO}`

const ToolHeader: React.FC = () => {
  const navigate = useNavigate()
  const [starCount, setStarCount] = useState<string>('--')

  useEffect(() => {
    const loadStars = async () => {
      await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
      .then(res => res.json())
      .then(data => setStarCount(data.stargazers_count ?? '--'))
      .catch(() => {
        setStarCount('--')
        throw new Error('Failed to fetch repository data')
      })
    }
    
    loadStars()
  }, [])

  return (
    <header className="tool-header">
      <div className="tool-header__inner">
        <div className="tool-header__brand" onClick={() => navigate('/')}>
          <div className="tool-header__logo">
            <Box size={18} />
          </div>
          <span className="tool-header__title">{APP_NAME}</span>
        </div>

        <div className="tool-header__meta">
          <a className="tool-header__meta-item tool-header__meta-item--link" href={githubRepoUrl} target="_blank" rel="noreferrer">
            <Star size={14} />
            <span className="tool-header__meta-text">GitHub</span>
            <span className="tool-header__meta-value">{starCount}</span>
          </a>
          <span className="tool-header__meta-item tool-header__meta-item--muted">
            <Clock3 size={13} />
            <span className="tool-header__meta-text">更新于 {__BUILD_TIME__}</span>
          </span>
        </div>
      </div>
    </header>
  )
}

export default ToolHeader
