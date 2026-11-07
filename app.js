require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./src/config/db');

const userRoute = require('./src/routes/userRoute');
const cultivoRoute = require('./src/routes/cultivoRoute');
const loteRoute = require('./src/routes/loteRoute');
const visitaRoute = require('./src/routes/visitaRoute');

const app = express();

app.use(cors());
app.use(express.json());

app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'ok', servicio: 'Campo Argentino API' });
});

app.use('/api/auth', userRoute);
app.use('/api/cultivos', cultivoRoute);
app.use('/api/lotes', loteRoute);
app.use('/api/visitas', visitaRoute);

// Ruta inexistente
app.use((req, res) => {
  res.status(404).json({ message: `Ruta no encontrada: ${req.method} ${req.originalUrl}` });
});

// JSON mal formado u otros errores no capturados
app.use((err, req, res, next) => {
  if (err.type === 'entity.parse.failed') {
    return res.status(400).json({ message: 'El body no es un JSON válido' });
  }
  console.error(err);
  res.status(500).json({ message: 'Error interno del servidor' });
});

const PORT = process.env.PORT || 3000;

// Solo levanta el servidor si se ejecuta directamente (permite importar app en tests)
if (require.main === module) {
  connectDB()
    .then(() => app.listen(PORT, () => console.log(`Servidor escuchando en http://localhost:${PORT}`)))
    .catch((err) => {
      console.error('No se pudo iniciar la aplicación:', err.message);
      process.exit(1);
    });
}

module.exports = app;
