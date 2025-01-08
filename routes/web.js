const express = require('express');
const path = require('path');
const { authenticateUi } = require('../middleware/authMiddleware');
const routes = express.Router();

routes.get('/', (req, res) => {
    res.send('Welcome to the Expense Tracker API');
});

routes.get('/register',(req,res)=>{
    return res.sendFile(path.join(__dirname,'../public','register.html'));
})
routes.get('/login',(req,res)=>{
    return res.sendFile(path.join(__dirname,'../public','login.html'));
})

routes.get('/dashboard',authenticateUi,(req,res)=>{
    return res.sendFile(path.join(__dirname,'../public','dashboard.html'));
})

module.exports = routes;