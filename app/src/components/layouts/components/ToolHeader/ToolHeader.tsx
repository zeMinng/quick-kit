import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Box, Star } from 'lucide-react'
import './ToolHeader.scss'

const APP_NAME = import.meta.env.VITE_APP_TITLE_UP
const GITHUB_REPO = import.meta.env.VITE_GITHUB_REPO || 'zeMinng/quick-kit'

const ToolHeader: React.FC = () => {
  const navigate = useNavigate()
  const [starCount, setStarCount] = useState<string>('--')
  const githubRepoUrl = useMemo(() => `https://github.com/${GITHUB_REPO}`, [])
  
  useEffect(() => {
    const loadStars = async () => {
      const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
        headers: {
          Accept: 'application/vnd.github.v3+json',
        },
      })
      .then(res => res.json())
      .catch(() => {
        setStarCount('--')
        throw new Error('Failed to fetch repository data')
      })
      const stars = res?.stargazers_count ?? '--'
      setStarCount(stars)
    }
    
    loadStars()
  }, [])

  return (
    <header className="tool-header">
      <div className="tool-header__inner">
        <button type="button" className="tool-header__brand" onClick={() => navigate('/')}>
          <div className="tool-header__logo">
            <Box size={18} />
          </div>
          <span className="tool-header__title">{APP_NAME}</span>
        </button>

        <div className="tool-header__meta">
          <a className="tool-header__star" href={githubRepoUrl} target="_blank" rel="noreferrer">
            <Star size={14} />
            <span>{starCount}</span>
          </a>
          <span className="tool-header__build">最近更新: {__BUILD_TIME__}</span>
        </div>
      </div>
    </header>
  )
}

export default ToolHeader
