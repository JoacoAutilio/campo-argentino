const loteService = require('../services/loteService');
const { handleError } = require('../middleware/errorHandler');

const getAll = async (req, res) => {
  try {
    res.status(200).json(await loteService.getAll(req.user, req.query));
  } catch (err) {
    handleError(res, err);
  }
};

const getCercanos = async (req, res) => {
  try {
    res.status(200).json(await loteService.getCercanos(req.user, req.query));
  } catch (err) {
    handleError(res, err);
  }
};

const getById = async (req, res) => {
  try {
    res.status(200).json(await loteService.getById(req.params.id, req.user));
  } catch (err) {
    handleError(res, err);
  }
};

const create = async (req, res) => {
  try {
    res.status(201).json(await loteService.create(req.body, req.user));
  } catch (err) {
    handleError(res, err);
  }
};

const update = async (req, res) => {
  try {
    res.status(200).json(await loteService.update(req.params.id, req.body, req.user));
  } catch (err) {
    handleError(res, err);
  }
};

const remove = async (req, res) => {
  try {
    await loteService.remove(req.params.id, req.user);
    res.status(200).json({ message: 'Lote eliminado correctamente' });
  } catch (err) {
    handleError(res, err);
  }
};

module.exports = { getAll, getCercanos, getById, create, update, remove };
