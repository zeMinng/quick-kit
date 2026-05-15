import './Footer.scss'
const APP_NAME = import.meta.env.VITE_APP_TITLE_UP

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <div className="footer__inner">
        <div className="footer__base">
          <p className="footer__line">
            <span className="footer__brand">{APP_NAME}</span>
            <span className="footer__sep" aria-hidden>·</span>
            <span className="footer__build">
              <span>构建于 {__BUILD_TIME__}</span>
            </span>
          </p>
          <p className="footer__line">
            <span className="footer__legal">© {currentYear > 2026 ? `2026-${currentYear}` : '2026'} {APP_NAME} by zeMinng.</span>
          </p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
