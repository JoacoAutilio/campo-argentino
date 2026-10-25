import { useState } from 'react'

// hook para manejar el formulario de contacto
function useContactForm(initialValues) {
  // estados del formulario
  const [values, setValues] = useState(initialValues)
  const [errors, setErrors] = useState({})
  const [submitted, setSubmitted] = useState(false)

  // actualiza el campo cuando el usuario escribe
  const handleChange = (e) => {
    const { name, value } = e.target
    setValues((prev) => ({ ...prev, [name]: value }))
    // si habia error lo limpio cuando empieza a escribir
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: '' }))
    }
  }

  // valida que todos los campos esten completos
  const validate = () => {
    const newErrors = {}

    if (!values.nombre.trim())
      newErrors.nombre = 'El nombre es obligatorio'

    if (!values.email.trim()) {
      newErrors.email = 'El email es obligatorio'
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
      newErrors.email = 'El email no es válido'
    }

    if (!values.provincia)
      newErrors.provincia = 'Seleccioná una provincia'

    if (!values.actividad)
      newErrors.actividad = 'Seleccioná una actividad'

    if (!values.consulta.trim())
      newErrors.consulta = 'La consulta es obligatoria'
    else if (values.consulta.trim().length < 20)
      newErrors.consulta = 'La consulta debe tener al menos 20 caracteres'

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  // maneja el submit, previene el comportamiento por defecto
  const handleSubmit = (e) => {
    e.preventDefault()
    if (validate()) {
      console.log('formulario enviado:', values)
      setSubmitted(true)
    } else {
      console.log('hay errores en el formulario')
    }
  }

  // resetea todo el formulario
  const resetForm = () => {
    setValues(initialValues)
    setErrors({})
    setSubmitted(false)
    console.log('formulario reseteado')
  }

  return { values, errors, submitted, handleChange, handleSubmit, resetForm }
}

export default useContactForm
