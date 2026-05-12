import { Link, useNavigate, useLocation } from 'react-router-dom'
import { Braces, Cpu, Image } from 'lucide-react'
import './Home.scss'

const APP_NAME = import.meta.env.VITE_APP_TITLE_UP as string

const productSignals = [
  { label: '数据路径', value: '本机浏览器，默认不上传' },
  { label: '开源许可', value: 'MIT，可 fork 自建' },
  { label: '交付形态', value: '支持安装为 PWA，可离线打开' },
]

const capabilityCards = [
  {
    title: '图像与媒体',
    description:
      '面向日常素材流：格式互转、尺寸调整、智能压缩与网格拼接。处理管线走 Canvas，预览与参数调整同步可见。',
    icon: Image,
  },
  {
    title: 'JSON 与结构化数据',
    description:
      '格式化、校验、压缩与展示模式切换；结果支持一键复制。逻辑在浏览器内完成，适合接口联调与日志整理。',
    icon: Braces,
  },
  {
    title: '性能与工程底座',
    description:
      '重计算放入 Web Worker，避免阻塞主线程交互。后续将把解析与转换热点逐步迁到 Rust + WebAssembly，以接近原生的吞吐。',
    icon: Cpu,
  },
]

const toolCatalog = [
  {
    id: 'json',
    name: 'JSON 工作台',
    description: '格式化、校验、压缩、转义与美化选项；适合在发布前快速过一遍 payload。',
    href: '/tools/json',
    actionLabel: '打开工具',
    available: true,
  },
  {
    id: 'image',
    name: '图像工具组',
    description: '互转、裁切、拼接与压缩等能力正在按模块合入主线；进度与需求可在 GitHub 跟踪。',
    href: null,
    actionLabel: null,
    available: false,
  },
] as const

const Home: React.FC = () => {
  const navigate = useNavigate()
  const location = useLocation()

  const goSection = (id: string) => {
    const scroll = () => document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' })
    if (location.pathname !== '/') {
      navigate('/')
      requestAnimationFrame(() => {
        requestAnimationFrame(() => scroll())
      })
    } else {
      scroll()
    }
  }

  return (
    <div className="home">
      <section className="home__hero" aria-labelledby="home-hero-heading">
        <div className="home__hero-wrap">
          <div className="home__hero-grid">
            <div className="home__hero-main">
              <p className="home__eyebrow">{APP_NAME}</p>
              <h1 id="home-hero-heading" className="home__title">
                文件留在本地，
                <br />
                常用能力不打折。
              </h1>
              <p className="home__lede">
                {APP_NAME}
                是一套纯前端的实用工具集合：无自有后端、无强制上传。图像与 JSON 等场景在浏览器里直接处理；配合
                PWA，断网也能打开已安装的版本。适合对隐私敏感、又希望「点开即用」的团队与个人。
              </p>
              <div className="home__hero-cta">
                <Link className="btn-primary" to="/tools/json">
                  打开 JSON 工作台
                </Link>
                <button type="button" className="btn-outline" onClick={() => goSection('tools')}>
                  查看工具目录
                </button>
              </div>
            </div>
            <aside className="home__hero-panel" aria-label="要点">
              <dl className="home__signals">
                {productSignals.map(s => (
                  <div key={s.label} className="home__signal">
                    <dt>{s.label}</dt>
                    <dd>{s.value}</dd>
                  </div>
                ))}
              </dl>
            </aside>
          </div>
        </div>
      </section>

      <div className="home__divider" aria-hidden />

      <section id="features" className="home__features" aria-labelledby="features-heading">
        <header className="home__section-head home__section-head--split">
          <div className="home__section-kicker">
            <span className="home__section-index" aria-hidden>
              01
            </span>
            <p className="home__section-label">产品主轴</p>
          </div>
          <div className="home__section-copy">
            <h2 id="features-heading" className="home__section-title">
              三类能力，覆盖日常交付
            </h2>
            <p className="home__section-desc">
              与仓库 README 中的路线图一致：先把「本地、可预览、可重复」做扎实，再按模块扩展格式与算法，而不是堆叠营销话术。
            </p>
          </div>
        </header>
        <div className="home__card-grid home__card-grid--bento">
          {capabilityCards.map(({ title, description, icon: Icon }, i) => (
            <article key={title} className="home__feature-card" data-bento={i === 2 ? 'wide' : undefined}>
              <span className="home__feature-index" aria-hidden>
                {String(i + 1).padStart(2, '0')}
              </span>
              <div className="home__feature-icon" aria-hidden>
                <Icon size={18} strokeWidth={1.75} />
              </div>
              <h3 className="home__feature-title">{title}</h3>
              <p className="home__feature-desc">{description}</p>
            </article>
          ))}
        </div>
      </section>

      <div className="home__divider" aria-hidden />

      <section id="tools" className="home__tools" aria-labelledby="tools-heading">
        <header className="home__section-head home__section-head--split">
          <div className="home__section-kicker">
            <span className="home__section-index" aria-hidden>
              02
            </span>
            <p className="home__section-label">工具目录</p>
          </div>
          <div className="home__section-copy">
            <h2 id="tools-heading" className="home__section-title">
              当前开放与进行中的模块
            </h2>
            <p className="home__section-desc">
              下列条目与代码路由一致：已挂载的路径可直接进入；未挂载的能力在仓库内迭代，避免占位外链。
            </p>
          </div>
        </header>
        <div className="home__tool-list" role="list">
          {toolCatalog.map((tool, row) => (
            <div key={tool.id} className="home__tool-row" role="listitem">
              <span className="home__tool-line" aria-hidden>
                {String(row + 1).padStart(2, '0')}
              </span>
              <div className="home__tool-icon" aria-hidden>
                {tool.id === 'json' ? <Braces size={16} strokeWidth={1.75} /> : <Image size={16} strokeWidth={1.75} />}
              </div>
              <div className="home__tool-copy">
                <div className="home__tool-name-row">
                  <h3 className="home__tool-name">{tool.name}</h3>
                  {!tool.available ? <span className="home__badge">筹备中</span> : null}
                </div>
                <p className="home__tool-desc">{tool.description}</p>
              </div>
              <div className="home__tool-action">
                {tool.available && tool.href ? (
                  <Link className="btn-primary" to={tool.href}>
                    {tool.actionLabel}
                  </Link>
                ) : (
                  <span className="home__tool-placeholder" aria-disabled>
                    敬请期待
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      <div className="home__divider" aria-hidden />

      <section id="about" className="home__about" aria-labelledby="about-heading">
        <div className="home__about-grid">
          <div className="home__about-rail">
            <span className="home__section-index" aria-hidden>
              03
            </span>
            <p className="home__section-label">关于与协作</p>
          </div>
          <div className="home__about-body">
            <h2 id="about-heading" className="home__about-title">
              开源维护，按真实排期演进
            </h2>
            <p className="home__about-text">
              本仓库由 zeMinng 发起，采用 MIT
              协议。若你在日常工作中依赖本地工具链，欢迎通过 Issue 描述场景、通过 PR 改进交互或补齐算法；Star
              也会帮助项目被更多人看到。当前主线已接通 JSON 工作台路由；图像与更多格式转换将按模块合入，不在首页伪造「立即体验」入口。
            </p>
            <p className="home__about-actions">
              <Link className="btn-primary" to="/tools/json">
                进入 JSON 工作台
              </Link>
              <a
                className="btn-outline"
                href="https://github.com/zeMinng/quick-kit"
                target="_blank"
                rel="noreferrer"
              >
                GitHub 仓库
              </a>
            </p>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home
