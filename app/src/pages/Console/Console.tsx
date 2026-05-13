import { useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Braces, Cpu, GitCompare, Image, Palette, Search } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Badge, Empty, Input, Tag } from 'antd'
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

  return (
    <div className="tool-console">
      <div className="tool-console__blooms" aria-hidden>
        <span className="tool-console__bloom tool-console__bloom--mint" />
        <span className="tool-console__bloom tool-console__bloom--peach" />
        <span className="tool-console__bloom tool-console__bloom--lavender" />
        <span className="tool-console__bloom tool-console__bloom--sky" />
      </div>

      <div className="tool-console__inner">
        <header className="tool-console__hero">
          <p className="tool-console__eyebrow">工具台</p>
          <h1 className="tool-console__title">按场景收纳的能力索引</h1>
          <p className="tool-console__lede">
            与仓库路由一致：已挂载的模块可直接进入；筹备中的条目仅作路线图提示，不跳转占位外链。搜索支持名称、说明与标签。
          </p>
        </header>

        <div className="tool-console__controls">
          <div className="tool-console__search">
            <Input
              allowClear
              size="large"
              placeholder="搜索工具名称、说明或标签…"
              value={query}
              onChange={e => setQuery(e.target.value)}
              prefix={<Search size={18} strokeWidth={1.75} aria-hidden />}
              className="tool-console__search-input"
            />
          </div>
          <dl className="tool-console__stats" aria-label="目录概览">
            <div className="tool-console__stat">
              <dt>已开放</dt>
              <dd>{stats.open}</dd>
            </div>
            <div className="tool-console__stat">
              <dt>筹备中</dt>
              <dd>{stats.soon}</dd>
            </div>
            <div className="tool-console__stat">
              <dt>共计</dt>
              <dd>{stats.total}</dd>
            </div>
          </dl>
        </div>

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
              <Empty className="tool-console__empty" description="没有匹配的工具，试试其他关键词" />
            ) : (
              toolCategories.map(cat => {
                const list = byCategory.get(cat.id) ?? []
                if (list.length === 0) return null
                return (
                  <section
                    key={cat.id}
                    id={`cat-${cat.id}`}
                    className={`tool-console__section tool-console__section--${cat.orb}`}
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
                      <p className="tool-console__section-blurb">{cat.blurb}</p>
                    </header>

                    <ul className="tool-console__grid">
                      {list.map(tool => {
                        const Icon = iconByKey[tool.iconKey]
                        const inner = (
                          <>
                            <div className="tool-console__card-top">
                              <span className="tool-console__card-icon" aria-hidden>
                                <Icon size={20} strokeWidth={1.75} />
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
                            <p className="tool-console__card-desc">{tool.description}</p>
                            <div className="tool-console__card-tags">
                              {tool.tags.map(tag => (
                                <Tag key={tag} className="tool-console__tag" bordered={false}>
                                  {tag}
                                </Tag>
                              ))}
                            </div>
                            <div className="tool-console__card-foot">
                              {tool.available && tool.href ? (
                                <span className="tool-console__cta tool-console__cta--in-link">进入工具</span>
                              ) : (
                                <span className="tool-console__cta tool-console__cta--disabled" aria-disabled>
                                  敬请期待
                                </span>
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
  )
}

export default ToolConsolePage
