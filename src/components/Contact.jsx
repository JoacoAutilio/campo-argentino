import useContactForm from '../hooks/useContactForm'
import '../styles/Contact.css'

// valores iniciales del formulario
const INITIAL_VALUES = {
  nombre: '',
  email: '',
  provincia: '',
  actividad: '',
  consulta: '',
}

// formulario de contacto controlado con validacion
function Contact() {
  const { values, errors, submitted, handleChange, handleSubmit, resetForm } =
    useContactForm(INITIAL_VALUES)

  // si ya se envio muestro pantalla de exito
  if (submitted) {
    return (
      <main className="cv-contact-page">
        <div className="cv-contact-success">
          <span className="cv-contact-success__icon" aria-hidden="true">✓</span>
          <h2>¡Consulta recibida!</h2>
          <p>
            Gracias, <strong>{values.nombre}</strong>. Un técnico de Campo Argentino
            se comunicará con vos a la brevedad.
          </p>
          <button className="cv-btn" onClick={resetForm}>
            Enviar otra consulta
          </button>
        </div>
      </main>
    )
  }

  return (
    <main className="cv-contact-page">
      <div className="container">
        <header className="cv-contact-header">
          <h1 className="cv-contact-title">Contacto</h1>
          <p className="cv-contact-subtitle">
            Completá el formulario y un asesor te contactará dentro de las 24 horas
          </p>
        </header>

        {/* uso noValidate para manejar la validacion con React */}
        <form className="cv-contact-form" onSubmit={handleSubmit} noValidate>

          <div className="cv-form-row">
            <div className="cv-form-group">
              <label htmlFor="nombre" className="cv-label">Nombre y apellido</label>
              <input
                id="nombre"
                type="text"
                name="nombre"
                className={`cv-input ${errors.nombre ? 'cv-input--error' : ''}`}
                placeholder="Juan Pérez"
                value={values.nombre}
                onChange={handleChange}
              />
              {/* muestro el error si existe */}
              {errors.nombre && <span className="cv-error">{errors.nombre}</span>}
            </div>

            <div className="cv-form-group">
              <label htmlFor="email" className="cv-label">Email</label>
              <input
                id="email"
                type="email"
                name="email"
                className={`cv-input ${errors.email ? 'cv-input--error' : ''}`}
                placeholder="juan@campo.com"
                value={values.email}
                onChange={handleChange}
              />
              {errors.email && <span className="cv-error">{errors.email}</span>}
            </div>
          </div>

          <div className="cv-form-row">
            <div className="cv-form-group">
              <label htmlFor="provincia" className="cv-label">Provincia</label>
              <select
                id="provincia"
                name="provincia"
                className={`cv-input ${errors.provincia ? 'cv-input--error' : ''}`}
                value={values.provincia}
                onChange={handleChange}
              >
                <option value="">Seleccioná una provincia</option>
                {['Buenos Aires','Córdoba','Santa Fe','Entre Ríos','La Pampa','San Luis','Mendoza','Otra'].map(
                  (prov) => <option key={prov} value={prov}>{prov}</option>
                )}
              </select>
              {errors.provincia && <span className="cv-error">{errors.provincia}</span>}
            </div>

            <div className="cv-form-group">
              <label htmlFor="actividad" className="cv-label">Actividad principal</label>
              <select
                id="actividad"
                name="actividad"
                className={`cv-input ${errors.actividad ? 'cv-input--error' : ''}`}
                value={values.actividad}
                onChange={handleChange}
              >
                <option value="">Seleccioná una actividad</option>
                {['Cosecha','Ganadería','Agricultura de presición','Siembra','Fumigación'].map(
                  (act) => <option key={act} value={act}>{act}</option>
                )}
              </select>
              {errors.actividad && <span className="cv-error">{errors.actividad}</span>}
            </div>
          </div>

          <div className="cv-form-group">
            <label htmlFor="consulta" className="cv-label">Tu consulta</label>
            <textarea
              id="consulta"
              name="consulta"
              className={`cv-input cv-textarea ${errors.consulta ? 'cv-input--error' : ''}`}
              placeholder="Contanos sobre tu campo, hectáreas, cultivos o lo que necesites..."
              rows={6}
              value={values.consulta}
              onChange={handleChange}
            />
            {errors.consulta && <span className="cv-error">{errors.consulta}</span>}
          </div>

          <div className="cv-form-actions">
            <button type="submit" className="cv-btn">Enviar consulta</button>
            <button type="button" className="cv-btn cv-btn--outline" onClick={resetForm}>
              Limpiar
            </button>
          </div>

        </form>
      </div>
    </main>
  )
}

export default Contact
