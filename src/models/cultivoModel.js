const mongoose = require('mongoose');

// Catálogo de cultivos (soja, maíz, trigo...). Los lotes lo referencian.
const cultivoSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], unique: true, trim: true },
    cicloDiasPromedio: { type: Number, min: [1, 'El ciclo debe ser mayor a 0'] },
    epocaSiembraRecomendada: { type: String, trim: true },
    descripcion: { type: String, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('Cultivo', cultivoSchema);
