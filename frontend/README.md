# Campo Argentino - Proyecto Final React

Proyecto final del ciclo Front End de la Tecnicatura en Desarrollo Web - UTN.

## ¿Cómo correr el proyecto?

```bash
npm install
npm run dev
```

Para verlo desde el celular (tiene que estar en el mismo wifi):
```bash
npx vite --host
```

## ¿De qué trata?

Es una plataforma de asesoramiento agropecuario argentino. Tiene secciones de servicios (siembra, cosecha, ganadería, fumigación y agricultura de precisión), galería de fotos del campo y formulario de contacto.

## Estructura

```
src/
├── components/    → todos los componentes
├── styles/        → css de cada componente
└── hooks/         → hooks personalizados
```

## Lo que incluye

- React con Vite
- React Router v6 para la navegación entre páginas
- Componentes con props y PropTypes
- useState para el formulario y la galería
- Dos custom hooks: useContactForm y useScrollToTop
- Validación del formulario con mensajes de error
- Bootstrap para el navbar
- Diseño responsive para mobile
- Imágenes propias en public/img
