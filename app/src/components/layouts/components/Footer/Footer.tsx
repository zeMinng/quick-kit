import './Footer.scss'
const APP_NAME = import.meta.env.VITE_APP_TITLE_UP

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="footer">
      <p className="footer__text">© {currentYear > 2026 ? `2026-${currentYear}` : '2026'} {APP_NAME}. Built with Passion for Developers.</p>
    </footer>
  )
}

export default Footer
