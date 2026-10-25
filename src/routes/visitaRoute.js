const express = require('express');
const visitaController = require('../controllers/visitaController');
const { verifyToken, authorizeRoles } = require('../middleware/verifyToken');

const router = express.Router();

router.use(verifyToken);

router.get('/', visitaController.getAll);
router.get('/:id', visitaController.getById);
router.post('/', authorizeRoles('asesor', 'admin'), visitaController.create);
router.put('/:id', authorizeRoles('asesor', 'admin'), visitaController.update);
router.delete('/:id', authorizeRoles('asesor', 'admin'), visitaController.remove);

module.exports = router;
