const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    nombre: { type: String, required: [true, 'El nombre es obligatorio'], trim: true },
    email: {
      type: String,
      required: [true, 'El email es obligatorio'],
      unique: true,
      lowercase: true,
      trim: true,
      match: [/^\S+@\S+\.\S+$/, 'El email no es válido']
    },
    // Se guarda siempre hasheada (pre-save hook). select:false evita traerla en las consultas.
    password: { type: String, required: [true, 'La contraseña es obligatoria'], select: false },
    rol: { type: String, enum: ['productor', 'asesor', 'admin'], default: 'productor' },
    telefono: { type: String, trim: true }
  },
  { timestamps: true }
);

// Hashea la contraseña antes de guardar (solo si cambió)
userSchema.pre('save', async function () {
  if (!this.isModified('password')) return;
  this.password = await bcrypt.hash(this.password, 10);
});

userSchema.methods.compararPassword = function (passwordPlano) {
  return bcrypt.compare(passwordPlano, this.password);
};

// Nunca devolver la contraseña en las respuestas JSON
userSchema.set('toJSON', {
  transform: (doc, ret) => {
    delete ret.password;
    delete ret.__v;
    return ret;
  }
});

module.exports = mongoose.model('Usuario', userSchema);
