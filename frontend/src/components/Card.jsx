import PropTypes from 'prop-types'
import '../styles/Card.css'

// componente de tarjeta reutilizable, recibe los datos por props
function Card({ title, category, description, image }) {
  return (
    <article className="cv-card">
      <div className="cv-card__image-wrapper">
        <img src={image} alt={title} className="cv-card__image" loading="lazy" />
        <span className="cv-card__badge">{category}</span>
      </div>
      <div className="cv-card__body">
        <h3 className="cv-card__title">{title}</h3>
        <p className="cv-card__description">{description}</p>
        <span className="cv-card__cta">Ver más →</span>
      </div>
    </article>
  )
}

// valido las props que recibe el componente
Card.propTypes = {
  title: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  image: PropTypes.string.isRequired,
}

export default Card
