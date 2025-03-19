const bcrypt = require('bcryptjs');

// Login Controller
const loginUser = async (req, res) => {
    try {
        // Validates if username is in database
        const {username,password} = req.body;
        const result = await pool.query(queries.getUserByUsername,[username]);
        if (result.rows.length === 0) {
            return res.render('login',{
                message: 'Invalid credential'
            });
        }

        // Validates if password matches
        const user = result.rows[0];
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