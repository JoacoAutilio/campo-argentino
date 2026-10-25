const express = require('express');
const loteController = require('../controllers/loteController');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

// Los lotes contienen datos privados del productor: todas las rutas requieren token
router.use(verifyToken);

router.get('/', loteController.getAll);
router.get('/cercanos', loteController.getCercanos); // antes de /:id para que no lo capture
router.get('/:id', loteController.getById);
router.post('/', loteController.create);
router.put('/:id', loteController.update);
router.delete('/:id', loteController.remove);

module.exports = router;
