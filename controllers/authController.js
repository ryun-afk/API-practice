const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');

// Login Controller
const loginUser = async (req, res) => {
    try {
        const {username,password} = req.body;
        
        // Error: Invalid username
        const user = await UserModel.findOne({username});
        if (!user) {
            return res.render('login',{
                message: 'Invalid credential'
            });
        }

        // Error: Invalid password
        const isPasswordValid = await bcrypt.compare(password,user.password);
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
        const {username,password,password2} = req.body;

        // Error: Taken username
        const existingUser = await UserModel.findOne({username});
        if (existingUser) { 
            return res.render('register',{
                message:'Username is taken'
            });
        };

        // Error: Passwords do not match
        if (password !== password2) {
            return res.render('register',{
                message:'Password does not match'
            });
        };

        // create account
        const hashedPassword = await bcrypt.hash(password,10);
        await UserModel.create({
            username: username,
            password: hashedPassword
        });
        return res.render('register',{
            message:'Account created'
        });

    } catch (error){
        console.error('Registration Error: ', error);
        return res.render('register',{
            message: 'Internal Server Error'
        });
    }
};

// Logout Controller
const logoutUser = (req, res) => {
    try {
        req.session.destroy(() => {
            res.redirect('login');
        });
    } catch (error) {
        console.error('Logout error: ', error);
        res.render('login', {
            message: 'Internal Server Error'
        });
    }
};

module.exports = {
    loginUser,
    registerUser,
    logoutUser,
}