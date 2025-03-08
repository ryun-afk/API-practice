const bcrypt = require('bcryptjs');
const {validationResult} = require('express-validator')

const pool = require('../config/dbconfig.js');
const queries = require('../db/queries.js');

// Login Controller
const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        return res.status(400).json({
            errors: errors.array()
        });
    }

    const {username,password} = req.body;
    try {
        const result = await pool.query(queries.getUserByUsername,[username]);
        if (result.rows.length === 0) {
            return res.render('login',{
                message: 'Invalid credential'
            });
        }

        const user = result.rows[0];
        const isPasswordValid = await bcrypt.compare(password,user.password);
        if (!isPasswordValid) {
            return res.render('login',{
                message: 'Invalid credential'
            });
        }
        
        req.session.user = {
            id: user.user_id,
            username:user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
        };

        return res.render('dashboard',{
            message: user.user_id
        });
    } catch (error) {
        console.error('Login error: ', error);
        return res.render('login',{
            message: 'Internal Server Error'
        });
    }
};

// Register Controller
const registerUser = async (req,res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ 
            errors: errors.array() 
        });
    }

    const {first_name,last_name,username,password} = req.body;
    try {
        const existingUser = await pool.query(queries.getUserByUsername,[username]);
        if (existingUser.rows.length > 0) { 
            return res.render('register',{
                message:'Username is taken'
            });
        };

        const hashedPassword = await bcrypt.hash(password,10);
        const result = await pool.query(queries.addUser,[first_name,last_name,username,hashedPassword]);
        return res.render('login',{
            message: 'Account registered'
        });

    } catch (error){
        console.error('Registration Error: ', error);
        return res.status(401).json({
            message: 'Internal Server Error'
        });
    }
};

// Logout Controller
const logoutUser = (req, res) => {
    req.session.destroy((err) => {
        if (err) {
            return res.status(500).json({
                message: 'Error during logout'
            });
        }
        return res.status(200).json({
            message: 'Logged out successfully'
        });
    });
}

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
}