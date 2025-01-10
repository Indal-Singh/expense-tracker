const User = require('../config/db');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const ApiResponse = require('../utils/apiResponse');

const register = (req, res) => {
    const { name, email, password } = req.body;
    User.createUser(name, email, password, (err) => {
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
        res.cookie('token', token, { maxAge: 900000 });
        ApiResponse.success(res, 'Login successful', { token });
    });
};

const verifyUser = (req, res) => {
    let userId = req.user.id;
    console.log(userId)
    // chcking bdatabase in user 
    User.findUserById(userId, (err, user) => {
        if (err) {
            return ApiResponse.error(res, 'User not found');
        }
        else {
            let userData = {
                id: user.id,
                name: user.name
            }
            return ApiResponse.success(res, "User Is Vaild" ,userData);
        }
    })
}

const logout = (req, res) => {
    res.clearCookie('token');
    return res.redirect('/login');
}

module.exports = { register, login, logout, verifyUser };
