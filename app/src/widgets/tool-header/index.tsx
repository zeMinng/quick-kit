import './tool-header.scss'

interface ToolHeaderProps {
  className?: string
  info: {
    prefix: string
    suffix: string
    description: string
  }
  icon?: React.ReactNode
}

const ToolHeader: React.FC<ToolHeaderProps> = ({ className, info, icon }) => {
  const { prefix, suffix, description } = info
  return (
    <section className={`tool-header ${className}`.trim()} aria-labelledby="tool-header-heading">
      <div className="tool-header__container">
        {icon && (
          <span className="tool-header__icon" aria-hidden="true">
            {icon}
          </span>
        )}
        
        <div className="tool-header__content">
          <h1 id="tool-header-heading" className="tool-header__title">
            <span className="tool-header__title-prefix">{prefix}</span>
            <span className="tool-header__title-suffix">{suffix}</span>
          </h1>
          <p className="tool-header__description">
            {description}
          </p>
        </div>
      </div>
    </section>
  )
}

export default ToolHeader