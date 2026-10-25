// Traduce errores de Mongoose / servicios a respuestas HTTP coherentes.
// Los servicios lanzan errores con la propiedad "status" (400, 404, 409, etc.).
const handleError = (res, err) => {
  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Datos inválidos',
      errores: Object.values(err.errors).map((e) => e.message)
    });
  }
  if (err.name === 'CastError') {
    return res.status(400).json({ message: `Valor inválido para "${err.path}"` });
  }
  if (err.code === 11000) {
    return res.status(409).json({
      message: 'Ya existe un registro con ese valor único',
      campos: err.keyValue
    });
  }

  const status = err.status || 500;
  if (status === 500) console.error(err);

  res.status(status).json({
    message: status === 500 ? 'Error interno del servidor' : err.message
  });
};

module.exports = { handleError };
