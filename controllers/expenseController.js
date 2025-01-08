const Expense = require('../config/db');
const ApiResponse = require('../utils/apiResponse');

const createExpense = (req, res) => {
    const { amount, description, type } = req.body;
    const userId = req.user.id;

    Expense.createExpense(userId, amount, description, type, (err) => {
        if (err) return ApiResponse.error(res, 'Error creating expense');
        ApiResponse.success(res, 'Expense added successfully');
    });
};

const getExpenses = (req, res) => {
    const userId = req.user.id;

    Expense.getExpensesByUser(userId, (err, expenses) => {
        if (err) return ApiResponse.error(res, 'Error fetching expenses');
        ApiResponse.success(res, 'Expenses fetched successfully', expenses);
    });
};

module.exports = { createExpense, getExpenses };
