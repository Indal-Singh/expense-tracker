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

const createExpense = (userId, amount, description, type, callback) => {
    db.run('INSERT INTO expenses (user_id, amount, description, type) VALUES (?, ?, ?, ?)',
        [userId, amount, description, type], callback);
};

const getExpensesByUser = (userId, callback) => {
    db.all('SELECT * FROM expenses WHERE user_id = ?', [userId], callback);
};

module.exports = {connectDB, createTables, createUser,findUserByUsername,createExpense,getExpensesByUser };
