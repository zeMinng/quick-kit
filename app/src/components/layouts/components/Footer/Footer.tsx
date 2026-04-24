import './Footer.scss'
const APP_NAME = import.meta.env.VITE_APP_TITLE_UP
const APP_NAME_CN = import.meta.env.VITE_APP_NAME

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <p className="footer__title">{APP_NAME}</p>
        <p className="footer__desc">{APP_NAME_CN} · 开箱即用的开发效率工具集</p>
        <p className="footer__text">© {currentYear > 2026 ? `2026-${currentYear}` : '2026'} {APP_NAME}. Crafted for developers.</p>
      </div>
    </footer>
  )
}

export default Footer
