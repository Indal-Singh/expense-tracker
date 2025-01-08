const User = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/apiResponse');

const register = (req, res) => {
    const { name, email, password } = req.body;
    User.createUser(name,email, password, (err) => {
        if (err) return ApiResponse.error(res, 'Error registering user');
        ApiResponse.success(res, 'User registered successfully');
    });
};

const login = (req, res) => {
    const { email, password } = req.body;

    User.findUserByUsername(email, (err, user) => {
        if (err || !user) {
            return ApiResponse.error(res, 'User not found');
        }

        const isMatch = bcrypt.compareSync(password, user.password);
        if (!isMatch) return ApiResponse.error(res, 'Invalid credentials');

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
        ApiResponse.success(res, 'Login successful', { token });
    });
};

module.exports = { register, login };
