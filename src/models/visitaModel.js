const mongoose = require('mongoose');

// Visita técnica: el asesor registra el estado del cultivo y sus recomendaciones
const visitaSchema = new mongoose.Schema(
  {
    lote: { type: mongoose.Schema.Types.ObjectId, ref: 'Lote', required: true },
    asesor: { type: mongoose.Schema.Types.ObjectId, ref: 'Usuario', required: true },
    fecha: { type: Date, default: Date.now },
    estadoCultivoObservado: { type: String, trim: true },
    observaciones: { type: String, trim: true },
    recomendaciones: { type: String, trim: true }
  },
  { timestamps: true }
);

// Historial de visitas de un lote, de la más reciente a la más vieja
visitaSchema.index({ lote: 1, fecha: -1 });
visitaSchema.index({ asesor: 1 });

module.exports = mongoose.model('Visita', visitaSchema);
