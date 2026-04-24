import { useNavigate } from 'react-router-dom'
import { Sparkles, Wrench, Zap, ShieldCheck, LayoutGrid, Gauge, ArrowUpRight, Cpu } from 'lucide-react'
import './Home.scss'

const quickTools = [
  { title: 'JSON 格式化', description: '校验、格式化与压缩一体化', icon: LayoutGrid, size: 'large', path: '/tools/json' },
  { title: 'Base64 编解码', description: '文本与片段内容快速互转', icon: Zap, size: 'normal' },
  { title: '时间戳转换', description: '秒、毫秒、日期时间双向映射', icon: Gauge, size: 'normal' },
  { title: '哈希生成', description: 'MD5 / SHA 系列摘要算法', icon: ShieldCheck, size: 'normal' },
  { title: 'URL 编解码', description: '参数、路径和特殊字符处理', icon: Wrench, size: 'wide' },
  { title: '文本处理', description: '去重、排序、替换、批量清洗', icon: Sparkles, size: 'normal' },
]

const Home: React.FC = () => {
  const navigate = useNavigate()

  return (
    <div className="home-page">
      <section className="home-intro">
        <div className="home-intro__badge">
          <Sparkles className="h-3 w-3" />
          QuickKit v1.0
        </div>

        <div className="home-intro__copy">
          <h1 className="home-intro__title">
            为开发者设计的效率中枢 <br />
            <span>极简全能工具箱</span>
          </h1>
          <p className="home-intro__desc">
            无需上传，本地处理。极致性能与隐私安全的完美平衡。
          </p>
        </div>

        <div className="home-hero__actions">
          {/* <Button type="button">立即开始</Button> */}
          {/* <Button variant="outline" type="button">探索工具集</Button> */}
        </div>
      </section>

      <section className="home-tools">
        <div className="home-tools__header">
          <h2>常用工具</h2>
        </div>
        <div className="home-tools__grid">
          {quickTools.map((tool) => {
            const Icon = tool.icon
            return (
              <button
                key={tool.title}
                className={`tool-card tool-card--${tool.size}`}
                type="button"
                onClick={() => tool.path && navigate(tool.path)}
              >
                <span className="tool-card__icon">
                  <Icon size={16} />
                </span>
                <div className="tool-card__content">
                  <strong>{tool.title}</strong>
                  <p>{tool.description}</p>
                </div>
                <ArrowUpRight size={14} className="tool-card__arrow" />
              </button>
            )
          })}
        </div>
      </section>

      <section className="home-values">
        <div className="value-card">
          <div className="value-card__head">
            <div className="value-card__icon">
            <Zap className="h-5 w-5" />
            </div>
            <h3>极致响应</h3>
          </div>
          <p>零延迟本地处理，所有操作均在浏览器中完成。</p>
        </div>
        <div className="value-card">
          <div className="value-card__head">
            <div className="value-card__icon">
            <ShieldCheck className="h-5 w-5" />
            </div>
            <h3>隐私至上</h3>
          </div>
          <p>无服务器设计，您的文件永不离开您的设备。</p>
        </div>
        <div className="value-card">
          <div className="value-card__head">
            <div className="value-card__icon">
            <Cpu className="h-5 w-5" />
            </div>
            <h3>现代架构</h3>
          </div>
          <p>基于 React 19 构建，享受最前沿的 Web 性能。</p>
        </div>
      </section>
    </div>
  )
}

export default Home
