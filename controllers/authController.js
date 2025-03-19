const bcrypt = require('bcryptjs');
const user = require('../models/UserModel');

// Login Controller
const loginUser = async (req, res) => {
    try {

        // Error: Missing username or password
        const {username,password} = req.body;
        if (!username || !password) {
            return res.render('login', {
                message: 'Username and password are required.'
            });
        }
        
        // Error: Invalid username
        const result = await user.findOne({username});
        if (!result) {
            return res.render('login',{
                message: 'Invalid credential'
            });
        }

        // Error: Invalid password
        const isPasswordValid = await bcrypt.compare(password,result.password);
        if (!isPasswordValid) {
            return res.render('login',{
                message: 'Invalid credential'
            });
        }
        
        // create session
        req.session.user = {
            id: user.user_id,
            username:user.username,
            first_name: user.first_name,
            last_name: user.last_name,
            role: user.role,
        };
        
        return res.redirect('/dashboard');
    } catch (error) {
        console.error('Login error: ', error);
        return res.render('login',{
            message: 'Internal Server Error'
        });
    }
};

// Register Controller
const registerUser = async (req,res) => {
    try {
        const {username,password} = req.body;
        const existingUser = await pool.query(queries.getUserByUsername,[username]);
        if (existingUser.rows.length > 0) { 
            return res.render('register',{
                message:'Username is taken'
            });
        };

        const hashedPassword = await bcrypt.hash(password,10);
        await pool.query(queries.addUser,[username,hashedPassword]);
        return res.redirect('login');

    } catch (error){
        console.error('Registration Error: ', error);
        return res.render('register',{
            message: 'Internal Server Error'
        });
    }
};

// Logout Controller
const logoutUser = async (req, res) => {
    try {
        req.session.destroy((err) => {
            if (err) {
                return res.status(500).json({
                    message: 'Error during logout'
                });
            }
            return res.redirect('login');
        });
    } catch {
        return res.render('login',{
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
}