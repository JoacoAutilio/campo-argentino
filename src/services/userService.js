const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const httpError = (status, message) => Object.assign(new Error(message), { status });

// El rol "admin" no se puede elegir al registrarse (se crea con el script de seed)
const ROLES_PUBLICOS = ['productor', 'asesor'];

const register = async ({ nombre, email, password, rol, telefono }) => {
  if (!nombre || !email || !password) {
    throw httpError(400, 'nombre, email y password son obligatorios');
  }
  if (String(password).length < 6) {
    throw httpError(400, 'La contraseña debe tener al menos 6 caracteres');
  }
  if (rol && !ROLES_PUBLICOS.includes(rol)) {
    throw httpError(400, 'El rol debe ser "productor" o "asesor"');
  }
  // El hook pre-save del modelo hashea la contraseña
  return User.create({ nombre, email, password, rol: rol || 'productor', telefono });
};

const login = async ({ email, password }) => {
  if (!email || !password) {
    throw httpError(400, 'email y password son obligatorios');
  }
  const user = await User.findOne({ email: String(email).toLowerCase() }).select('+password');
  if (!user || !(await user.compararPassword(password))) {
    throw httpError(401, 'Credenciales inválidas');
  }
  const token = jwt.sign({ id: user._id, rol: user.rol }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN || '8h'
  });
  return { token, usuario: user };
};

const getPerfil = async (id) => {
  const user = await User.findById(id);
  if (!user) throw httpError(404, 'Usuario no encontrado');
  return user;
};

module.exports = { register, login, getPerfil };
