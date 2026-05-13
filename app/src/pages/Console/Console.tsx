import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Braces, Cpu, GitCompare, Image, Palette, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge, Button, Empty, Input } from 'antd'
import type { ToolEntry, ToolIconKey } from '@/configs/tools'
import { toolCategories, toolEntries } from '@/configs/tools'
import './Console.scss'

const iconByKey: Record<ToolIconKey, LucideIcon> = {
  braces: Braces,
  image: Image,
  cpu: Cpu,
  diff: GitCompare,
  palette: Palette,
}

function normalize(s: string) {
  return s.trim().toLowerCase()
}

function toolMatchesQuery(tool: ToolEntry, q: string): boolean {
  if (!q) return true
  const n = normalize(q)
  const hay = [tool.name, tool.tagline, tool.description, ...tool.tags].join('\n').toLowerCase()
  return hay.includes(n)
}

const ToolConsolePage: React.FC = () => {
  const [query, setQuery] = useState('')

  const filtered = useMemo(() => toolEntries.filter(t => toolMatchesQuery(t, query)), [query])

  const byCategory = useMemo(() => {
    const map = new Map<string, ToolEntry[]>()
    for (const c of toolCategories) {
      map.set(c.id, [])
    }
    for (const t of filtered) {
      map.get(t.categoryId)?.push(t)
    }
    return map
  }, [filtered])

  const stats = useMemo(() => {
    const open = toolEntries.filter(t => t.available).length
    const soon = toolEntries.length - open
    return { open, soon, total: toolEntries.length }
  }, [])

  const signalItems = [
    { label: '已开放', value: String(stats.open) },
    { label: '筹备中', value: String(stats.soon) },
    { label: '共计', value: String(stats.total) },
  ] as const

  return (
    <div className="tool-console">
      <section className="tool-console__hero" aria-labelledby="console-hero-heading">
        <div className="tool-console__hero-wrap">
          <div className="tool-console__hero-row">
            <div className="tool-console__hero-main">
              <h1 id="console-hero-heading" className="tool-console__title">
                工具台
              </h1>
              <p className="tool-console__lede">按场景浏览；已上线的工具可直接进入。</p>
            </div>
            <div className="tool-console__hero-rail">
              <div className="tool-console__hero-search tool-console__search">
                <Input
                  allowClear
                  size="large"
                  placeholder="搜索名称或标签"
                  value={query}
                  onChange={e => setQuery(e.target.value)}
                  prefix={<Search size={18} strokeWidth={1.75} aria-hidden />}
                  className="tool-console__search-input"
                />
              </div>
              <div className="tool-console__hero-signals" role="group" aria-label="工具台概览">
                {signalItems.map(s => (
                  <div key={s.label} className="tool-console__signal-tiny">
                    <span className="tool-console__signal-tiny-label">{s.label}</span>
                    <span className="tool-console__signal-tiny-value">{s.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="tool-console__body">
        <div className="tool-console__body-inner">
          <div className="tool-console__shell">
            <aside className="tool-console__rail" aria-label="分类跳转">
              <p className="tool-console__rail-label">目录</p>
              <nav className="tool-console__rail-nav">
                {toolCategories.map(c => (
                  <a key={c.id} className="tool-console__rail-link" href={`#cat-${c.id}`}>
                    <span className="tool-console__rail-index">{c.index}</span>
                    <span className="tool-console__rail-title">{c.title}</span>
                  </a>
                ))}
              </nav>
            </aside>

            <div className="tool-console__main">
              {filtered.length === 0 ? (
                <Empty className="tool-console__empty" description="没有匹配的工具，换个关键词试试" />
              ) : (
                toolCategories.map(cat => {
                  const list = byCategory.get(cat.id) ?? []
                  if (list.length === 0) return null
                  return (
                    <section
                      key={cat.id}
                      id={`cat-${cat.id}`}
                      className="tool-console__section"
                      data-orb={cat.orb}
                      aria-labelledby={`tool-console-cat-${cat.id}`}
                    >
                      <header className="tool-console__section-head">
                        <div className="tool-console__section-kicker">
                          <span className="tool-console__section-index" aria-hidden>
                            {cat.index}
                          </span>
                          <h2 id={`tool-console-cat-${cat.id}`} className="tool-console__section-title">
                            {cat.title}
                          </h2>
                        </div>
                      </header>

                      <ul className="tool-console__grid">
                        {list.map(tool => {
                          const Icon = iconByKey[tool.iconKey]
                          const inner = (
                            <>
                              <div className="tool-console__card-top">
                                <span className="tool-console__card-icon" aria-hidden>
                                  <Icon size={18} strokeWidth={1.75} />
                                </span>
                                <div className="tool-console__card-head">
                                  <div className="tool-console__card-name-row">
                                    <h3 className="tool-console__card-name">{tool.name}</h3>
                                    {!tool.available ? (
                                      <Badge status="default" text="筹备中" className="tool-console__card-badge" />
                                    ) : null}
                                  </div>
                                  <p className="tool-console__card-tagline">{tool.tagline}</p>
                                </div>
                              </div>
                              <div className="tool-console__card-foot">
                                {tool.available && tool.href ? (
                                  <Button type="primary" size="small">
                                    进入
                                  </Button>
                                ) : (
                                  <Button type="primary" size="small" disabled>
                                    敬请期待
                                  </Button>
                                )}
                              </div>
                            </>
                          )

                          return (
                            <li key={tool.id} className="tool-console__card-wrap">
                              {tool.available && tool.href ? (
                                <Link className="tool-console__card tool-console__card--link" to={tool.href}>
                                  {inner}
                                </Link>
                              ) : (
                                <div className="tool-console__card">{inner}</div>
                              )}
                            </li>
                          )
                        })}
                      </ul>
                    </section>
                  )
                })
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ToolConsolePage
