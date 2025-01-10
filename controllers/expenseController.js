const Expense = require('../config/db');
const ApiResponse = require('../utils/apiResponse');

const createExpense = (req, res) => {
    const { amount, description, type,datetime } = req.body;
    const userId = req.user.id;

    Expense.createExpense(userId, amount, description, type, datetime,(err) => {
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

const getExpensesTodayMonthly = (req,res) => {
    const userId = req.user.id; 
    Expense.getTodayMonthlyExpense(userId,(err,expense)=>{
        if (err) return ApiResponse.error(res, 'Error fetching expenses');
        ApiResponse.success(res, 'Expenses fetched successfully', expense);     
    })
}

const getRecentExspensesByUser = (req,res) => {
    let userId  = req.user.id;
    Expense.getRecentExspensesByUser(userId,(err,expense)=>{
        if (err) return ApiResponse.error(res, 'Error fetching expenses');
        ApiResponse.success(res, 'Expenses fetched successfully', expense);     
    })
}

const deleteExpenseRecord = (req,res) =>{
    let userId= req.user.id;
    let expenseId = req.params.id;
    Expense.deleteExpenseRecord(userId,expenseId,(err,expense)=>{
        if (err) return ApiResponse.error(res, 'Error delete expenses');
        ApiResponse.success(res, 'Expenses Deleted successfully', expense);     
    })

}

module.exports = { 
    createExpense,
    getExpenses ,
    getExpensesTodayMonthly,
    getRecentExspensesByUser,
    deleteExpenseRecord,
    deleteExpenseRecord
};
