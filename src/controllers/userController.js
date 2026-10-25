const userService = require('../services/userService');
const { handleError } = require('../middleware/errorHandler');

const register = async (req, res) => {
  try {
    const usuario = await userService.register(req.body);
    res.status(201).json(usuario);
  } catch (err) {
    handleError(res, err);
  }
};

const login = async (req, res) => {
  try {
    const resultado = await userService.login(req.body);
    res.status(200).json(resultado);
  } catch (err) {
    handleError(res, err);
  }
};

const perfil = async (req, res) => {
  try {
    const usuario = await userService.getPerfil(req.user.id);
    res.status(200).json(usuario);
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { register, login, perfil };
