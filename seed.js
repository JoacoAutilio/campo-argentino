// Carga inicial: crea el usuario admin y el catálogo de cultivos (no duplica si ya existen).
// Uso: npm run seed
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./src/config/db');
const User = require('./src/models/userModel');
const Cultivo = require('./src/models/cultivoModel');

const cultivos = [
  { nombre: 'Soja', cicloDiasPromedio: 140, epocaSiembraRecomendada: 'Octubre - Noviembre', descripcion: 'Cultivo de verano, sensible al fotoperíodo.' },
  { nombre: 'Maíz', cicloDiasPromedio: 150, epocaSiembraRecomendada: 'Septiembre - Octubre', descripcion: 'Alta demanda de nitrógeno, requiere buena disponibilidad hídrica.' },
  { nombre: 'Trigo', cicloDiasPromedio: 180, epocaSiembraRecomendada: 'Mayo - Julio', descripcion: 'Cultivo de invierno, cosecha en verano.' },
  { nombre: 'Girasol', cicloDiasPromedio: 130, epocaSiembraRecomendada: 'Octubre - Noviembre', descripcion: 'Buena tolerancia a suelos con menor fertilidad.' }
];

const seed = async () => {
  await connectDB();

  const email = (process.env.ADMIN_EMAIL || 'admin@campoargentino.com').toLowerCase();
  if (await User.exists({ email })) {
    console.log(`Admin ya existe: ${email}`);
  } else {
    await User.create({
      nombre: process.env.ADMIN_NOMBRE || 'Admin Campo Argentino',
      email,
      password: process.env.ADMIN_PASSWORD || 'Admin1234',
      rol: 'admin'
    });
    console.log(`Admin creado: ${email}`);
  }

  for (const c of cultivos) {
    if (await Cultivo.exists({ nombre: c.nombre })) {
      console.log(`Cultivo ya existe: ${c.nombre}`);
    } else {
      await Cultivo.create(c);
      console.log(`Cultivo creado: ${c.nombre}`);
    }
  }

  await mongoose.disconnect();
};

seed().catch((err) => {
  console.error('Error en el seed:', err.message);
  process.exit(1);
});
