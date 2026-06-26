import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/Servicios.css'

// lista de los 5 servicios principales con el mismo estilo que el home
function Servicios({ servicios }) {
  return (
    <main className="cv-servicios-page">
      <header className="cv-page-header">
        <h1 className="cv-page-title">Nuestros Servicios</h1>
        <p className="cv-page-subtitle">Soluciones integrales para el productor agropecuario</p>
      </header>

      <div className="container">
        <div className="cv-servicios-grid">
          {servicios.map((servicio, index) => (
            // primera card es featured igual que en el home
            <Link
              to={`/servicios/${servicio.id}`}
              key={servicio.id}
              className={`cv-home-card ${index === 0 ? 'cv-home-card--featured' : ''}`}
            >
              <img
                src={servicio.image}
                alt={servicio.title}
                className="cv-home-card__img"
                loading="lazy"
              />
              <div className="cv-home-card__overlay" />
              <div className="cv-home-card__content">
                <span className="cv-home-card__category">{servicio.category}</span>
                <h3 className="cv-home-card__title">{servicio.title}</h3>
                <p className="cv-home-card__description">{servicio.description}</p>
                <span className="cv-home-card__cta">
                  {servicio.subcultivos ? 'Ver cultivos →' : 'Ver más →'}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </main>
  )
}

Servicios.propTypes = {
  servicios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      subcultivos: PropTypes.bool.isRequired,
    })
  ).isRequired,
}

export default Servicios
