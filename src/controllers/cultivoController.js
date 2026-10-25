const cultivoService = require('../services/cultivoService');
const { handleError } = require('../middleware/errorHandler');

const getAll = async (req, res) => {
  try {
    res.status(200).json(await cultivoService.getAll());
  } catch (err) {
    handleError(res, err);
  }
};

const getById = async (req, res) => {
  try {
    res.status(200).json(await cultivoService.getById(req.params.id));
  } catch (err) {
    handleError(res, err);
  }
};

const create = async (req, res) => {
  try {
    res.status(201).json(await cultivoService.create(req.body));
  } catch (err) {
    handleError(res, err);
  }
};

const remove = async (req, res) => {
  try {
    await cultivoService.remove(req.params.id);
    res.status(200).json({ message: 'Cultivo eliminado correctamente' });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { getAll, getById, create, remove };
