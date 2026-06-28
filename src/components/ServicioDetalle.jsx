import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/ServicioDetalle.css'

// muestra el detalle de un servicio, si tiene subservicios los muestra como cards
function ServicioDetalle({ servicios }) {
  // uso useParams para obtener el id de la URL
  const { servicioId, subservicioId } = useParams()
  const servicio = servicios.find((s) => s.id === servicioId)

  if (!servicio) {
    return (
      <main className="cv-detalle-page">
        <div className="cv-detalle-not-found">
          <h2>Servicio no encontrado</h2>
          <Link to="/servicios" className="cv-btn">Volver a servicios</Link>
        </div>
      </main>
    )
  }

  // si hay subservicio en la url muestro su detalle
  if (subservicioId && servicio.subservicios) {
    const sub = servicio.subservicios.find((s) => s.id === subservicioId)
    if (sub) {
      return (
        <main className="cv-detalle-page">
          <div className="cv-detalle-hero">
            <img src={sub.image} alt={sub.title} className="cv-detalle-hero__img" />
            <div className="cv-detalle-hero__overlay" />
            <div className="cv-detalle-hero__content">
              <span className="cv-detalle-hero__category">{servicio.title}</span>
              <h1 className="cv-detalle-hero__title">{sub.title}</h1>
            </div>
          </div>
          <div className="container">
            <div className="cv-detalle-body">
              <p className="cv-detalle-descripcion">{sub.detalle}</p>
              <div className="cv-detalle-actions">
                <Link to={`/servicios/${servicio.id}`} className="cv-btn cv-btn--outline">← Volver a {servicio.title}</Link>
                <Link to="/contacto" className="cv-btn">Consultar</Link>
              </div>
            </div>
          </div>
        </main>
      )
    }
  }

  // si el servicio tiene subservicios los muestro como cards clickeables
  if (servicio.subservicios) {
    return (
      <main className="cv-detalle-page">
        <div className="cv-detalle-hero">
          <img src={servicio.image} alt={servicio.title} className="cv-detalle-hero__img" style={servicio.imagePosition ? { objectPosition: servicio.imagePosition } : {}} />
          <div className="cv-detalle-hero__overlay" />
          <div className="cv-detalle-hero__content">
            <span className="cv-detalle-hero__category">{servicio.category}</span>
            <h1 className="cv-detalle-hero__title">{servicio.title}</h1>
          </div>
        </div>

        <div className="container">
          <div className="cv-detalle-body">
            <p className="cv-detalle-descripcion">{servicio.detalle}</p>

            <div className="cv-subservicios-grid">
              {servicio.subservicios.map((sub) => (
                <Link
                  key={sub.id}
                  to={`/servicios/${servicio.id}/${sub.id}`}
                  className="cv-subservicio-card"
                >
                  <div className="cv-subservicio-card__image-wrapper">
                    <img
                      src={sub.image}
                      alt={sub.title}
                      className="cv-subservicio-card__image"
                      loading="lazy"
                    />
                    <div className="cv-subservicio-card__overlay" />
                  </div>
                  <div className="cv-subservicio-card__body">
                    <h3 className="cv-subservicio-card__title">{sub.title}</h3>
                    <p className="cv-subservicio-card__description">{sub.description}</p>
                    <span className="cv-subservicio-card__cta">Ver más →</span>
                  </div>
                </Link>
              ))}
            </div>

            <div className="cv-detalle-actions">
              <Link to="/servicios" className="cv-btn cv-btn--outline">← Volver a servicios</Link>
            </div>
          </div>
        </div>
      </main>
    )
  }

  // servicio simple sin subservicios
  return (
    <main className="cv-detalle-page">
      <div className="cv-detalle-hero">
        <img src={servicio.image} alt={servicio.title} className="cv-detalle-hero__img" />
        <div className="cv-detalle-hero__overlay" />
        <div className="cv-detalle-hero__content">
          <span className="cv-detalle-hero__category">{servicio.category}</span>
          <h1 className="cv-detalle-hero__title">{servicio.title}</h1>
        </div>
      </div>
      <div className="container">
        <div className="cv-detalle-body">
          <p className="cv-detalle-descripcion">{servicio.detalle}</p>
          <div className="cv-detalle-actions">
            <Link to="/servicios" className="cv-btn cv-btn--outline">← Volver a servicios</Link>
            <Link to="/contacto" className="cv-btn">Consultar</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

ServicioDetalle.propTypes = {
  servicios: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      detalle: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
      subservicios: PropTypes.array,
    })
  ).isRequired,
}

export default ServicioDetalle
