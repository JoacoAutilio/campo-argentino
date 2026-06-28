import { useParams, Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import '../styles/ServicioDetalle.css'

// muestra el detalle de un cultivo dentro de siembra
function CultivoDetalle({ cultivos }) {
  // obtengo el id del cultivo de la URL
  const { cultivoId } = useParams()
  const cultivo = cultivos.find((c) => c.id === cultivoId)

  if (!cultivo) {
    return (
      <main className="cv-detalle-page">
        <div className="cv-detalle-not-found">
          <h2>Cultivo no encontrado</h2>
          <Link to="/servicios/siembra" className="cv-btn">Volver a siembra</Link>
        </div>
      </main>
    )
  }

  return (
    <main className="cv-detalle-page">
      <div className="cv-detalle-hero">
        <img src={cultivo.image} alt={cultivo.title} className="cv-detalle-hero__img" style={cultivo.imagePosition ? { objectPosition: cultivo.imagePosition } : {}} />
        <div className="cv-detalle-hero__overlay" />
        <div className="cv-detalle-hero__content">
          <span className="cv-detalle-hero__category">{cultivo.category}</span>
          <h1 className="cv-detalle-hero__title">{cultivo.title}</h1>
        </div>
      </div>

      <div className="container">
        <div className="cv-detalle-body">
          <p className="cv-detalle-descripcion">{cultivo.detalle}</p>
          <div className="cv-detalle-actions">
            <Link to="/servicios/siembra" className="cv-btn cv-btn--outline">← Volver a siembra</Link>
            <Link to="/contacto" className="cv-btn">Consultar</Link>
          </div>
        </div>
      </div>
    </main>
  )
}

CultivoDetalle.propTypes = {
  cultivos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      detalle: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default CultivoDetalle
