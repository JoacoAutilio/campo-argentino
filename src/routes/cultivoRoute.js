const express = require('express');
const cultivoController = require('../controllers/cultivoController');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

// El catálogo es público para lectura; cualquier usuario autenticado lo modifica
router.get('/', cultivoController.getAll);
router.get('/:id', cultivoController.getById);
router.post('/', verifyToken, cultivoController.create);
router.delete('/:id', verifyToken, cultivoController.remove);

module.exports = router;
