import { useNavigate } from 'react-router-dom'
import { Globe, Lock, Sparkles, Zap } from 'lucide-react'
import './Home.scss'

const PRIMARY_TOOL_PATH = '/tools/json'

const productSignals = [
  { label: '处理方式', value: '本地优先' },
  { label: '隐私策略', value: '默认不上传' },
  { label: '使用门槛', value: '打开即用' },
]

const capabilityCards = [
  {
    title: '极致响应',
    description: '零延迟本地处理，所有操作均在浏览器中完成。',
    icon: Zap,
  },
  {
    title: '隐私至上',
    description: '无服务器设计，您的文件永不离开您的设备。',
    icon: Lock,
  },
  {
    title: '日常工具',
    description: '界面简洁、操作轻量，适合反复打开的效率工具场景。',
    icon: Globe,
  },
]

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <section className="home-hero">
        <div className="home-hero__copy">
          <div className="home-hero__badge">
            <Sparkles size={14} />
            为开发者准备的极简工具
          </div>
          <h1 className="home-hero__title">
            把零碎开发任务
            <br />
            <span>收回一个清爽入口。</span>
          </h1>
          <p className="home-hero__desc">
            QuickKit 把开发工作里高频、零碎、重复的小任务收进一个极简工具集合里。
            本地优先，打开就能用。
          </p>

          <div className="home-hero__actions">
            <button
              type="button"
              className="home-hero__action home-hero__action--primary"
              onClick={() => navigate(PRIMARY_TOOL_PATH)}
            >
              立即开始使用
            </button>
          </div>

          <div className="home-hero__signals">
            {productSignals.map(signal => (
              <div key={signal.label} className="home-hero__signal">
                <span>{signal.label}</span>
                <strong>{signal.value}</strong>
              </div>
            ))}
          </div>
        </div>

        <div className="home-preview">
          <div className="home-preview__window">
            <div className="home-preview__topbar">
              <span />
              <span />
              <span />
            </div>
            <div className="home-preview__content">
              <div className="home-preview__eyebrow">QuickKit 控制台</div>
              <h2>把常用开发辅助动作放进一个统一工作区。</h2>
              <p>
                格式化、编码、转换、清洗与校验。减少切换，保持专注，也保留足够快的响应。
              </p>
              <div className="home-preview__stats">
                <div>
                  <strong>6+</strong>
                  <span>核心工具</span>
                </div>
                <div>
                  <strong>100%</strong>
                  <span>浏览器内处理</span>
                </div>
                <div>
                  <strong>0</strong>
                  <span>额外配置</span>
                </div>
              </div>
            </div>
          </div>
          <div className="home-preview__rail">
            <div>
              <span>推荐入口</span>
              <strong>JSON 格式化</strong>
            </div>
            <div>
              <span>处理方式</span>
              <strong>本地处理</strong>
            </div>
          </div>
        </div>
      </section>

      <section className="home-strip">
        <p>基于现代 Web 技术构建</p>
        <div className="home-strip__items">
          <span>React</span>
          <span>TypeScript</span>
          <span>Vite</span>
        </div>
      </section>

      <section className="home-capabilities">
        <div className="home-capabilities__intro">
          <span>为什么是 QuickKit</span>
          <h2>把重复、细碎、却每天都会遇到的开发动作整理得更简单。</h2>
        </div>
        <div className="home-capabilities__grid">
          {capabilityCards.map(item => {
            const Icon = item.icon

            return (
              <article key={item.title} className="capability-card">
                <div className="capability-card__icon">
                  <Icon size={18} />
                </div>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            )
          })}
        </div>
      </section>

      <section className="home-cta">
        <span className="home-cta__label">开始使用</span>
        <h2>让开发过程更快、更专注，也更安心。</h2>
        <p>从一个工具开始，逐步把常用开发动作收回到同一个工作区里。</p>
        <button type="button" className="home-cta__button" onClick={() => navigate(PRIMARY_TOOL_PATH)}>
          打开 JSON 格式化
        </button>
      </section>
    </div>
  )
}

export default Home
