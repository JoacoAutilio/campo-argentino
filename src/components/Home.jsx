import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import { serviciosData } from '../App'
import '../styles/Home.css'

// pagina principal: hero, estadisticas y servicios
function Home({ title, subtitle, description, heroImage }) {
  return (
    <main>
      {/* seccion hero con imagen de fondo */}
      <section className="cv-hero">
        <div
          className="cv-hero__bg"
          style={{ backgroundImage: `url(${heroImage})` }}
          aria-hidden="true"
        />
        <div className="cv-hero__overlay" aria-hidden="true" />
        <div className="cv-hero__content">
          <span className="cv-hero__eyebrow">{subtitle}</span>
          <h1 className="cv-hero__title">{title}</h1>
          <p className="cv-hero__description">{description}</p>
          <Link to="/servicios" className="cv-hero__cta">Ver servicios</Link>
        </div>
        <div className="cv-hero__scroll" aria-hidden="true">
          <span className="cv-hero__scroll-line"></span>
        </div>
      </section>

      {/* estadisticas del estudio */}
      <section className="cv-stats">
        <div className="container">
          <div className="cv-stats__grid">
            {[
              { value: '+200', label: 'Productores asesorados' },
              { value: '15 años', label: 'De experiencia en el campo' },
              { value: '8 pcias', label: 'De presencia nacional' },
              { value: '100%', label: 'Compromiso con la tierra' },
            ].map((stat) => (
              <div className="cv-stat" key={stat.label}>
                <span className="cv-stat__value">{stat.value}</span>
                <span className="cv-stat__label">{stat.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* grilla de servicios, cada card lleva a su ruta */}
      <section className="cv-home-servicios">
        <div className="container">
          <div className="cv-section-header">
            <h2 className="cv-section-title">Nuestros servicios</h2>
            <p className="cv-section-subtitle">Todo lo que el campo necesita, en un solo lugar</p>
          </div>

          <div className="cv-home-servicios__grid">
            {serviciosData.map((servicio, index) => (
              // la primera card es featured y ocupa mas espacio
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
      </section>
    </main>
  )
}

Home.propTypes = {
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  heroImage: PropTypes.string.isRequired,
}

export default Home
