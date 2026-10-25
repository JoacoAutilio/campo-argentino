const visitaService = require('../services/visitaService');
const { handleError } = require('../middleware/errorHandler');

const getAll = async (req, res) => {
  try {
    res.status(200).json(await visitaService.getAll(req.user, req.query));
  } catch (err) {
    handleError(res, err);
  }
};

const getById = async (req, res) => {
  try {
    res.status(200).json(await visitaService.getById(req.params.id, req.user));
  } catch (err) {
    handleError(res, err);
  }
};

const create = async (req, res) => {
  try {
    res.status(201).json(await visitaService.create(req.body, req.user));
  } catch (err) {
    handleError(res, err);
  }
};

const update = async (req, res) => {
  try {
    res.status(200).json(await visitaService.update(req.params.id, req.body, req.user));
  } catch (err) {
    handleError(res, err);
  }
};

const remove = async (req, res) => {
  try {
    await visitaService.remove(req.params.id, req.user);
    res.status(200).json({ message: 'Visita eliminada correctamente' });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { getAll, getById, create, update, remove };
