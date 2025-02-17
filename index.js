const express = require('express');
const dotenv = require('dotenv');
const authRoutes = require('./routes/authRoutes');
const expenseRoutes = require('./routes/expenseRoutes');
const webRoutes = require('./routes/web');
const path = require('path');
const { connectDB } = require('./config/db');
const cookieParser = require('cookie-parser');

dotenv.config();
const app = express();

connectDB();
app.use(cookieParser())
app.use(express.static(path.join(__dirname,'public')))
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

app.use('/',webRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/expenses', expenseRoutes);


const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
