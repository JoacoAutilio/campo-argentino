import PropTypes from 'prop-types'
import '../styles/Footer.css'

// iconos svg para las redes sociales
const iconos = {
  Facebook: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
    </svg>
  ),
  Instagram: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
      <circle cx="12" cy="12" r="4"/>
      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
    </svg>
  ),
  YouTube: (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M22.54 6.42a2.78 2.78 0 0 0-1.95-1.96C18.88 4 12 4 12 4s-6.88 0-8.59.46A2.78 2.78 0 0 0 1.46 6.42 29 29 0 0 0 1 12a29 29 0 0 0 .46 5.58 2.78 2.78 0 0 0 1.95 1.96C5.12 20 12 20 12 20s6.88 0 8.59-.46a2.78 2.78 0 0 0 1.95-1.96A29 29 0 0 0 23 12a29 29 0 0 0-.46-5.58z"/>
      <polygon points="9.75 15.02 15.5 12 9.75 8.98 9.75 15.02" fill="white"/>
    </svg>
  ),
}

function Footer({ brand, tagline, socialLinks }) {
  const year = new Date().getFullYear()

  return (
    <footer className="cv-footer">
      <div className="cv-footer__inner">
        <div className="container">

          <div className="cv-footer__brand-wrap">
            <span className="cv-footer__brand">🌾 {brand}</span>
            <p className="cv-footer__tagline">{tagline}</p>
          </div>

          <div className="cv-footer__divider" />

          {/* redes sociales con iconos */}
          <div className="cv-footer__social-wrap">
            <p className="cv-footer__col-title">Seguinos en</p>
            <ul className="cv-footer__social">
              {socialLinks.map((link) => (
                <li key={link.label}>
                  <a
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="cv-footer__social-link"
                    aria-label={link.label}
                  >
                    <span className="cv-footer__social-icon">{iconos[link.label]}</span>
                    <span>{link.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <p className="cv-footer__copy">
            © {year} {brand}. Todos los derechos reservados.
          </p>

        </div>
      </div>
    </footer>
  )
}

Footer.propTypes = {
  brand: PropTypes.string.isRequired,
  tagline: PropTypes.string.isRequired,
  socialLinks: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      url: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Footer
