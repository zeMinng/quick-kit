import { useEffect, useState } from 'react'
import { GITHUB_REPO } from '@/constants'

export function useGithubStars() {
  const [stars, setStars] = useState<string | null>(null)

  useEffect(() => {
    let mounted = true

    async function load() {
      try {
        const res = await fetch(`https://api.github.com/repos/${GITHUB_REPO}`, {
          headers: { Accept: 'application/vnd.github.v3+json' },
        })

        if (!res.ok) throw new Error('Failed to fetch stars')

        const data = await res.json()
        if (mounted) {
          setStars(data.stargazers_count ?? '-')
        }
      } catch {
        if (mounted) {
          setStars('-')
        }
      }
    }

    load()

    return () => {
      mounted = false
    }
  }, [])

  return stars
}
