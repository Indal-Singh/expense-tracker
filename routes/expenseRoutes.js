const express = require('express');
const { createExpense, getExpenses } = require('../controllers/expenseController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authenticate, createExpense);
router.get('/all', authenticate, getExpenses);

module.exports = router;
