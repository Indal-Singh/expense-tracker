const express = require('express');
const { register, login ,logout } = require('../controllers/authController');
const { authenticateUi } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/logout',authenticateUi,logout)

module.exports = router;
