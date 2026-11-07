const jwt = require('jsonwebtoken');

// Verifica el JWT del header "Authorization: Bearer <token>" y deja el usuario en req.user
const verifyToken = (req, res, next) => {
  const [scheme, token] = (req.headers.authorization || '').split(' ');

  if (scheme !== 'Bearer' || !token) {
    return res.status(401).json({ message: 'Token no proporcionado' });
  }

  try {
    const payload = jwt.verify(token, process.env.JWT_SECRET);
    req.user = { id: payload.id, rol: payload.rol };
    next();
  } catch (err) {
    return res.status(401).json({ message: 'Token inválido o expirado' });
  }
};

// Restringe una ruta a ciertos roles (se usa siempre después de verifyToken)
const authorizeRoles = (...roles) => (req, res, next) => {
  if (!roles.includes(req.user.rol)) {
    return res.status(403).json({ message: 'No tenés permisos para realizar esta acción' });
  }
  next();
};

module.exports = { verifyToken, authorizeRoles };
