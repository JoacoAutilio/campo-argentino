import { Routes, Route } from 'react-router-dom'
import useScrollToTop from './hooks/useScrollToTop'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './components/Home'
import Gallery from './components/Gallery'
import Contact from './components/Contact'
import Servicios from './components/Servicios'
import ServicioDetalle from './components/ServicioDetalle'
import Siembra from './components/Siembra'
import CultivoDetalle from './components/CultivoDetalle'

// ── Datos de cultivos (dentro de Siembra) ────────────────────────────────────
export const cultivosData = [
  {
    id: 'soja',
    title: 'Soja',
    imagePosition: 'center center',
    category: 'Oleaginosas',
    description: 'Asesoramiento técnico en siembra directa, densidades y variedades para la región pampeana.',
    detalle: 'Trabajamos con productores de soja en todo el ciclo del cultivo: análisis de suelo, elección de variedad, densidad de siembra, manejo de malezas y enfermedades, y seguimiento fenológico. Nuestro equipo aplica tecnología de precisión para maximizar el rendimiento por hectárea.',
    image: '/img/Soja.jpg',
  },
  {
    id: 'maiz',
    title: 'Maíz',
    imagePosition: 'center center',
    category: 'Cereales',
    description: 'Planificación de lotes, híbridos de alta rinde y manejo de plagas y enfermedades.',
    detalle: 'El maíz requiere una planificación cuidadosa desde la elección del híbrido hasta la cosecha. Asesoramos en nutrición, densidad de siembra, manejo de plagas como el gusano cogollero y optimización del riego para lograr los mejores rendimientos.',
    image: '/img/Maiz.jpg',
  },
  {
    id: 'girasol',
    title: 'Girasol',
    imagePosition: 'center 40%',
    category: 'Oleaginosas',
    description: 'Cultivos de alta rentabilidad con seguimiento satelital de lotes y humedad de suelo.',
    detalle: 'El girasol es uno de los cultivos más rentables de la pampa húmeda. Brindamos asesoramiento en selección de híbridos, fechas de siembra óptimas, manejo de Sclerotinia y seguimiento satelital continuo de los lotes para decisiones oportunas.',
    image: '/img/Girasol.jpg',
  },
  {
    id: 'trigo',
    title: 'Trigo',
    imagePosition: 'center center',
    category: 'Cereales',
    description: 'Cultivo de invierno con análisis de suelo, nutrición y seguimiento fenológico completo.',
    detalle: 'El trigo es la columna vertebral de la rotación agrícola argentina. Asesoramos en la elección de cultivares, nutrición nitrogenada, control de enfermedades fúngicas y manejo del rinde para obtener granos de alta calidad comercial.',
    image: '/img/Trigo.jpg',
  },
]

// ── Datos de servicios principales ──────────────────────────────────────────
export const serviciosData = [
  {
    id: 'siembra',
    title: 'Siembra',
    imagePosition: 'center center',
    category: 'Servicios',
    description: 'Servicio de siembra directa con equipos de última generación y monitoreo en tiempo real.',
    detalle: 'Contamos con sembradoras de precisión para siembra directa en distintos tipos de suelo. Realizamos la planificación del lote, calibración de la sembradora y seguimiento post-siembra para asegurar una implantación uniforme del cultivo.',
    image: '/img/Siembra.jpg',
    subcultivos: true,
  },
  {
    id: 'cosecha',
    title: 'Cosecha',
    imagePosition: 'center 40%',
    category: 'Servicios',
    description: 'Cosecha eficiente con maquinaria de alta capacidad para minimizar pérdidas y maximizar rendimiento.',
    detalle: 'Disponemos de cosechadoras de alta capacidad con sistema de monitoreo de pérdidas y mapas de rendimiento. Coordinamos la logística de cosecha para reducir tiempos y garantizar la calidad del grano.',
    image: '/img/Cosecha.jpg',
    subcultivos: false,
  },
  {
    id: 'ganaderia',
    title: 'Ganadería',
    imagePosition: 'center center',
    category: 'Servicios',
    description: 'Gestión de hacienda, pasturas naturales y sistemas de feedlot para la Pampa Húmeda.',
    detalle: 'Asesoramos en la gestión integral de rodeos bovinos: sanidad animal, manejo de pasturas, suplementación estratégica y sistemas de engorde a corral. Trabajamos con productores criadores, invernadores y tamberos.',
    image: '/img/Ganaderia.jpg',
    subcultivos: false,
  },
  {
    id: 'fumigacion',
    title: 'Fumigación',
    imagePosition: 'center center',
    category: 'Servicios',
    description: 'Aplicación terrestre y aérea de fitosanitarios con tecnología de precisión y mínimo impacto ambiental.',
    detalle: 'Contamos con dos modalidades de aplicación de fitosanitarios para adaptarnos a cada lote y necesidad del productor.',
    image: '/img/Fumigación.jpg',
    subcultivos: false,
    subservicios: [
      {
        id: 'terrestre',
        title: 'Fumigación Terrestre',
        description: 'Aplicación con equipos terrestres de alta capacidad para lotes accesibles.',
        detalle: 'Realizamos aplicaciones terrestres con equipos autopropulsados de última generación, con barras de hasta 36 metros y dosificación variable por GPS. Ideal para lotes de gran superficie con buena accesibilidad.',
        image: '/img/Fumigacion2.jpg',
      },
      {
        id: 'drones',
        title: 'Fumigación con Drones',
        description: 'Aplicación aérea con drones agrícolas para mayor precisión y menor impacto ambiental.',
        detalle: 'Utilizamos drones agrícolas de última generación para aplicaciones de alta precisión en lotes de difícil acceso, zonas inundables o cultivos en estados avanzados. Menor compactación del suelo y mayor eficiencia en el uso de agroquímicos.',
        image: '/img/Fumigacion drones.jpg',
      },
    ],
  },
  {
    id: 'agricultura-de-precision',
    title: 'Agricultura de precisión',
    imagePosition: 'center 30%',
    category: 'Tecnología',
    description: 'Drones, sensores remotos y mapas de rendimiento para decisiones basadas en datos.',
    detalle: 'Implementamos tecnologías de agricultura de precisión: NDVI satelital, sensores de humedad, mapas de rendimiento y prescripciones de insumos variables. Transformamos los datos del campo en decisiones concretas que mejoran la rentabilidad.',
    image: '/img/agriculturadeprecision.jpg',
    subcultivos: false,
  },
]

// ── Imágenes para la Galería ─────────────────────────────────────────────────
const galeriaImagenes = [
  { id: 1, url: '/img/Galeria/Hacienda.jpg.jpg', alt: 'Hacienda en el campo' },
  { id: 2, url: '/img/Galeria/Lotedemaiz.jpg', alt: 'Lote de maíz' },
  { id: 3, url: '/img/Galeria/Fumigandomaiz.jpg', alt: 'Fumigando maíz' },
  { id: 4, url: '/img/Galeria/Cargandolatolva.avif', alt: 'Cargando la tolva' },
  { id: 5, url: '/img/Galeria/Descargandocosechadora.jpg', alt: 'Descargando cosechadora' },
  { id: 6, url: '/img/Galeria/Cargandosembradora.jpg', alt: 'Cargando sembradora' },
  { id: 7, url: '/img/Galeria/Sembrando.jpg', alt: 'Sembrando en el campo' },
  { id: 8, url: '/img/Galeria/Ternerosalimentados.jpg', alt: 'Terneros alimentados' },
  { id: 9, url: '/img/Galeria/Fumigaciondron.jpg', alt: 'Fumigación con dron' },
  { id: 10, url: '/img/Galeria/Sojasembrada.jpg', alt: 'Soja sembrada' },
]

// ── Datos del Hero ───────────────────────────────────────────────────────────
const homeData = {
  title: 'El campo que nos alimenta',
  subtitle: 'Asesoramiento agropecuario profesional',
  description: 'Acompañamos productores rurales argentinos con tecnología, experiencia y pasión por la tierra. Desde la semilla hasta el mercado.',
  heroImage: '/img/Imagenfondo.jpg',
}

function App() {
  // Scroll al tope en cada cambio de ruta
  useScrollToTop()

  return (
    <>
      <Navbar
        brand="CAMPO ARGENTINO"
        links={[
          { label: 'Inicio', path: '/' },
          { label: 'Servicios', path: '/servicios' },
          { label: 'Galería', path: '/galeria' },
          { label: 'Contacto', path: '/contacto' },
        ]}
      />

      <Routes>
        <Route
          path="/"
          element={
            <Home
              title={homeData.title}
              subtitle={homeData.subtitle}
              description={homeData.description}
              heroImage={homeData.heroImage}
            />
          }
        />
        {/* Listado de servicios */}
        <Route path="/servicios" element={<Servicios servicios={serviciosData} />} />
        {/* Siembra tiene subcultivos */}
        <Route path="/servicios/siembra" element={<Siembra cultivos={cultivosData} />} />
        <Route path="/servicios/siembra/:cultivoId" element={<CultivoDetalle cultivos={cultivosData} />} />
        {/* Resto de servicios y subservicios */}
        <Route path="/servicios/:servicioId" element={<ServicioDetalle servicios={serviciosData} />} />
        <Route path="/servicios/:servicioId/:subservicioId" element={<ServicioDetalle servicios={serviciosData} />} />
        <Route path="/galeria" element={<Gallery images={galeriaImagenes} title="Galería del Campo" />} />
        <Route path="/contacto" element={<Contact />} />
      </Routes>

      <Footer
        brand="CAMPO ARGENTINO"
        tagline="Raíces en la tierra, vista en el futuro"
        socialLinks={[
          { label: 'Facebook', url: '#' },
          { label: 'Instagram', url: '#' },
          { label: 'YouTube', url: '#' },
        ]}
      />
    </>
  )
}

export default App
