const sqlite3 = require('sqlite3').verbose();
const bcrypt = require('bcryptjs');
const fs = require('fs').promises;
const path = require('path');

let db;

const checkAndCreateFolder = async (folderPath) => {
    try {
        // Check if the folder exists
        await fs.access(folderPath);
        console.log('Folder already exists');
    } catch (err) {
        // If the folder doesn't exist, create it
        await fs.mkdir(folderPath, { recursive: true });
        console.log('Folder created successfully');
    }
};


const connectDB = () => {
    let dbFolder = path.join(__dirname, '../db-file');
    checkAndCreateFolder(dbFolder)
    return db = new sqlite3.Database(dbFolder+'/expense-tracker.db', (err) => {
        if (err) {
            console.error('Error opening database', err);
        } else {
            console.log('Connected to SQLite database');
        }
    });
};



// Create tables
const createTables = () => {
    db.run(
        `CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            name TEXT DEFAULT NULL,
            email TEXT UNIQUE NOT NULL,
            password TEXT NOT NULL,
            date DATETIME DEFAULT CURRENT_TIMESTAMP
        )`
    );

    db.run(
        `CREATE TABLE IF NOT EXISTS expenses (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            user_id INTEGER NOT NULL,
            amount DECIMAL NOT NULL,
            description TEXT,
            type TEXT DEFAULT NULL,
            date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
            FOREIGN KEY (user_id) REFERENCES users(id)
        )`
    );
};

const createUser = (name, email, password, callback) => {
    const hashedPassword = bcrypt.hashSync(password, 10);
    console.log("Indal0",db);
    db.run('INSERT INTO users (name,email, password) VALUES (?, ?, ?)', [name,email, hashedPassword], callback);
};

const findUserByUsername = (email, callback) => {
    db.get('SELECT * FROM users WHERE email = ?', [email], callback);
};

const findUserById = (id,callback) =>{
    db.get('SELECT * FROM users WHERE id = ?',[id],callback);
}

const createExpense = (userId, amount, description, type, datetime, callback) => {
    db.run('INSERT INTO expenses (user_id, amount, description, type,date) VALUES (?, ?, ?, ?, ?)',
        [userId, amount, description, type, datetime], callback);
};

const getExpensesByUser = (userId, callback) => {
    db.all('SELECT * FROM expenses WHERE user_id = ?', [userId], callback);
};

const getTodayMonthlyExpense = (userId, callback) => {
    db.get(`SELECT 
        SUM(CASE WHEN DATE(date) = DATE('now') AND type = 'DR' THEN amount ELSE 0 END) AS today_debit_expense,
        SUM(CASE WHEN strftime('%Y-%m', date) = strftime('%Y-%m', 'now') AND type = 'DR' THEN amount ELSE 0 END) AS monthly_debit_expense,
        SUM(CASE WHEN type = 'DR' THEN amount ELSE 0 END) AS all_time_debit_expense,

        SUM(CASE WHEN DATE(date) = DATE('now') AND type = 'CR' THEN amount ELSE 0 END) AS today_credit_expense,
        SUM(CASE WHEN strftime('%Y-%m', date) = strftime('%Y-%m', 'now') AND type = 'CR' THEN amount ELSE 0 END) AS monthly_credit_expense,
        SUM(CASE WHEN type = 'CR' THEN amount ELSE 0 END) AS all_time_credit_expense
    FROM expenses
    WHERE user_id = ?`, [userId], (err, row) => {
        if (err) {
            console.error("Error running query:", err);
            callback(err, null);
            return;
        }
        
        if (!row) {
            callback(null, {
                today_debit_expense: 0,
                monthly_debit_expense: 0,
                all_time_debit_expense: 0,
                today_credit_expense: 0,
                monthly_credit_expense: 0,
                all_time_credit_expense: 0
            });
        } else {
            callback(null, {
                today_debit_expense: row.today_debit_expense || 0,
                monthly_debit_expense: row.monthly_debit_expense || 0,
                all_time_debit_expense: row.all_time_debit_expense || 0,
                today_credit_expense: row.today_credit_expense || 0,
                monthly_credit_expense: row.monthly_credit_expense || 0,
                all_time_credit_expense: row.all_time_credit_expense || 0
            });
        }
    });
};

const getRecentExspensesByUser = (userId, callback) => {
    db.all(`SELECT * FROM expenses
            WHERE user_id = ?
            ORDER BY date DESC
            LIMIT 30`, [userId], (err, rows) => {
        if (err) {
            console.error("Error running query:", err);
            callback(err, null);
            return;
        }
        
        if (!rows || rows.length === 0) {
            callback(null, []);
        } else {
            callback(null, rows);
        }
    });
};


const deleteExpenseRecord = (userId,expenseId,callback) =>{
    db.run("DELETE FROM expenses WHERE user_id=? AND id=?",[userId,expenseId],(err,row) =>{
        if (err) {
            return callback(err); 
        }
        callback(null, this.changes); // sending deleted id
    })

}


module.exports = {
connectDB, 
createTables, 
createUser,
findUserByUsername,
createExpense,
getExpensesByUser,
findUserById,
getTodayMonthlyExpense,
getRecentExspensesByUser,
deleteExpenseRecord
};
