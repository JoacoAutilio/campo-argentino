import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'
import Card from './Card'
import '../styles/Siembra.css'

// pagina de siembra que muestra los 4 cultivos usando el componente Card
function Siembra({ cultivos }) {
  return (
    <main className="cv-siembra-page">
      <header className="cv-page-header">
        <h1 className="cv-page-title">Siembra</h1>
        <p className="cv-page-subtitle">Seleccioná un cultivo para ver más información</p>
      </header>

      <div className="container">
        <div className="cv-cultivos-grid">
          {cultivos.map((cultivo) => (
            <Link
              to={`/servicios/siembra/${cultivo.id}`}
              key={cultivo.id}
              className="cv-cultivo-link"
            >
              {/* uso el componente Card pasandole las props de cada cultivo */}
              <Card
                title={cultivo.title}
                category={cultivo.category}
                description={cultivo.description}
                image={cultivo.image}
              />
            </Link>
          ))}
        </div>

        <div className="cv-siembra-back">
          <Link to="/servicios" className="cv-btn cv-btn--outline">← Volver a servicios</Link>
        </div>
      </div>
    </main>
  )
}

Siembra.propTypes = {
  cultivos: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      image: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Siembra
