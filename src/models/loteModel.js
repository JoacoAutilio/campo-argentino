const mongoose = require('mongoose');

const loteSchema = new mongoose.Schema(
  {
    nombreLote: { type: String, required: [true, 'El nombre del lote es obligatorio'], trim: true },

    // Embebido: la ubicación solo se usa junto con su lote
    ubicacion: {
      provincia: { type: String, trim: true },
      localidad: { type: String, trim: true },
      // GeoJSON Point: coordinates = [longitud, latitud] (requerido por el índice 2dsphere)
      coordenadas: {
        type: { type: String, enum: ['Point'] },
        coordinates: { type: [Number], default: undefined }
      }
    },

    hectareas: { type: Number, min: [0.1, 'Las hectáreas deben ser mayores a 0'] },

    // Referenciados (ObjectId reales)
    productor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    tipoCultivo: { type: mongoose.Schema.Types.ObjectId, ref: 'Cultivo', required: true },

    estado: {
      type: String,
      enum: ['sembrado', 'en_crecimiento', 'cosechado', 'barbecho'],
      default: 'barbecho'
    },
    fechaSiembraEstimada: { type: Date }
  },
  { timestamps: true }
);

// Índices propuestos en el TP de diseño
loteSchema.index({ productor: 1 });
loteSchema.index({ tipoCultivo: 1 });
loteSchema.index({ 'ubicacion.coordenadas': '2dsphere' });

module.exports = mongoose.model('Lote', loteSchema);
