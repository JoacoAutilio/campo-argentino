const express = require('express');
const userController = require('../controllers/userController');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.post('/register', userController.register);
router.post('/login', userController.login);
router.get('/me', verifyToken, userController.perfil);

module.exports = router;
