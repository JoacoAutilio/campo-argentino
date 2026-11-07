import { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import '../styles/Gallery.css'

// galeria de imagenes con lightbox para ver cada foto
function Gallery({ title, images }) {
  const [activeIndex, setActiveIndex] = useState(null)

  // para el swipe en mobile
  const touchStartX = useRef(null)

  const openLightbox  = (i) => setActiveIndex(i)
  const closeLightbox = () => setActiveIndex(null)
  const goTo = (dir) =>
    setActiveIndex((prev) => (prev + dir + images.length) % images.length)

  // detecta el inicio del toque
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX
  }

  // detecta el fin del toque y decide si fue swipe
  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return
    const diff = touchStartX.current - e.changedTouches[0].clientX
    if (Math.abs(diff) > 50) {
      goTo(diff > 0 ? 1 : -1)
    }
    touchStartX.current = null
  }

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
              <img src={img.url} alt={img.alt} loading="lazy" className="cv-gallery-thumb" />
              <div className="cv-gallery-item__caption">{img.alt}</div>
            </button>
          ))}
        </div>
      </div>

      {/* lightbox */}
      {activeIndex !== null && (
        <div
          className="cv-lightbox"
          role="dialog"
          aria-modal="true"
          onClick={closeLightbox}
        >
          <button className="cv-lightbox__close" onClick={closeLightbox} aria-label="Cerrar">✕</button>

          {/* flechas desktop - costados */}
          <button
            className="cv-lightbox__nav cv-lightbox__nav--prev cv-lightbox__nav--desktop"
            onClick={(e) => { e.stopPropagation(); goTo(-1) }}
            aria-label="Anterior"
          >‹</button>

          {/* imagen con soporte swipe */}
          <img
            src={images[activeIndex].url}
            alt={images[activeIndex].alt}
            className="cv-lightbox__image"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchEnd={handleTouchEnd}
          />

          <button
            className="cv-lightbox__nav cv-lightbox__nav--next cv-lightbox__nav--desktop"
            onClick={(e) => { e.stopPropagation(); goTo(1) }}
            aria-label="Siguiente"
          >›</button>

          {/* flechas mobile - debajo de la imagen */}
          <div className="cv-lightbox__controls-mobile" onClick={(e) => e.stopPropagation()}>
            <button
              className="cv-lightbox__nav"
              onClick={(e) => { e.stopPropagation(); goTo(-1) }}
              aria-label="Anterior"
            >‹</button>
            <p className="cv-lightbox__caption">{images[activeIndex].alt}</p>
            <button
              className="cv-lightbox__nav"
              onClick={(e) => { e.stopPropagation(); goTo(1) }}
              aria-label="Siguiente"
            >›</button>
          </div>

          {/* caption desktop */}
          <p className="cv-lightbox__caption--desktop">{images[activeIndex].alt}</p>
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
