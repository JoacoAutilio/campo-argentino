import { useState } from 'react'
import PropTypes from 'prop-types'
import '../styles/Gallery.css'

// galeria de imagenes con lightbox para ver cada foto
function Gallery({ title, images }) {
  // guardo el indice de la imagen abierta, null = cerrado
  const [activeIndex, setActiveIndex] = useState(null)

  const openLightbox  = (i) => setActiveIndex(i)
  const closeLightbox = () => setActiveIndex(null)

  // navega entre imagenes con los botones anterior/siguiente
  const goTo = (dir) =>
    setActiveIndex((prev) => (prev + dir + images.length) % images.length)

  return (
    <main className="cv-gallery-page">
      <header className="cv-gallery-header">
        <h1 className="cv-gallery-title">{title}</h1>
        <p className="cv-gallery-count">{images.length} imágenes</p>
      </header>

      <div className="container">
        <div className="cv-gallery-grid">
          {images.map((img, index) => (
            <button
              key={img.id}
              className="cv-gallery-item"
              onClick={() => openLightbox(index)}
              aria-label={`Ver: ${img.alt}`}
            >
              <img
                src={img.url}
                alt={img.alt}
                loading="lazy"
                className="cv-gallery-thumb"
              />
              <div className="cv-gallery-item__caption">{img.alt}</div>
            </button>
          ))}
        </div>
      </div>

      {/* lightbox: se muestra cuando activeIndex no es null */}
      {activeIndex !== null && (
        <div
          className="cv-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button className="cv-lightbox__close" onClick={closeLightbox} aria-label="Cerrar">✕</button>

          <img
            src={images[activeIndex].url}
            alt={images[activeIndex].alt}
            className="cv-lightbox__image"
            onClick={(e) => e.stopPropagation()}
          />

          <div className="cv-lightbox__controls" onClick={(e) => e.stopPropagation()}>
            <button
              className="cv-lightbox__nav cv-lightbox__nav--prev"
              onClick={(e) => { e.stopPropagation(); goTo(-1) }}
              aria-label="Anterior"
            >‹</button>
            <p className="cv-lightbox__caption">{images[activeIndex].alt}</p>
            <button
              className="cv-lightbox__nav cv-lightbox__nav--next"
              onClick={(e) => { e.stopPropagation(); goTo(1) }}
              aria-label="Siguiente"
            >›</button>
          </div>
        </div>
      )}
    </main>
  )
}

Gallery.propTypes = {
  title: PropTypes.string.isRequired,
  images: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      url: PropTypes.string.isRequired,
      alt: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Gallery
