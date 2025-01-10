const express = require('express');
const { register, login ,logout, verifyUser } = require('../controllers/authController');
const { authenticateUi, authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.get('/verify',authenticate, verifyUser)
router.get('/logout',authenticateUi,logout)

module.exports = router;
