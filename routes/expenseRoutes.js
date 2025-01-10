const express = require('express');
const { createExpense, getExpenses, getExpensesTodayMonthly, getRecentExspensesByUser, deleteExpenseRecord  } = require('../controllers/expenseController');
const { authenticate } = require('../middleware/authMiddleware');
const router = express.Router();

router.post('/create', authenticate, createExpense);
router.get('/all', authenticate, getExpenses);
router.get('/get-expenses-by-today-monthly', authenticate, getExpensesTodayMonthly);
router.get('/get-expenses-by-user', authenticate, getRecentExspensesByUser);
router.delete('/delete-expense/:id', authenticate, deleteExpenseRecord);

module.exports = router;
