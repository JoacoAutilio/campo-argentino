import { NavLink } from 'react-router-dom'
import PropTypes from 'prop-types'
import { useState } from 'react'
import '../styles/Navbar.css'

// navbar principal con menu hamburguesa para mobile
function Navbar({ brand, links }) {
  const [menuAbierto, setMenuAbierto] = useState(false)

  // cierra el menu cuando hago click en un link
  const cerrarMenu = () => setMenuAbierto(false)

  return (
    <nav className="navbar navbar-expand-lg cv-navbar fixed-top">
      <div className="container">

        <NavLink className="navbar-brand cv-brand" to="/" onClick={cerrarMenu}>
          <span className="cv-brand__icon" aria-hidden="true">🌾</span>
          {brand}
        </NavLink>

        <button
          className="navbar-toggler cv-toggler"
          type="button"
          aria-controls="navbarMain"
          aria-expanded={menuAbierto}
          aria-label="Toggle navigation"
          onClick={() => setMenuAbierto(!menuAbierto)}
        >
          <span className="cv-toggler-bar"></span>
          <span className="cv-toggler-bar"></span>
          <span className="cv-toggler-bar"></span>
        </button>

        {/* uso show de bootstrap para abrir y cerrar el menu */}
        <div className={`collapse navbar-collapse ${menuAbierto ? 'show' : ''}`} id="navbarMain">
          <ul className="navbar-nav ms-auto">
            {links.map((link) => (
              <li className="nav-item" key={link.path}>
                <NavLink
                  to={link.path}
                  end
                  className={({ isActive }) =>
                    `nav-link cv-nav-link${isActive ? ' cv-nav-link--active' : ''}`
                  }
                  onClick={cerrarMenu}
                >
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

      </div>
    </nav>
  )
}

Navbar.propTypes = {
  brand: PropTypes.string.isRequired,
  links: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      path: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Navbar
