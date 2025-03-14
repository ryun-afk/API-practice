const bcrypt = require('bcryptjs');
const pool = require('../config/dbconfig.js');
const queries = require('../db/queries.js');

// Update user details
const updateUser = async (req,res) => {
    const { firstName, lastName, oldPassword, newPassword, confirmPassword } = req.body;
    const userID = req.session.user.id;

    // Validate required fields
    if (!firstName || !lastName) {
        console.log(firstName,lastName)
        return res.render('settings',{
            message: 'First name and last name are required'
        });
    }

    try {
        // Update database
        await pool.query(queries.updateName, [firstName, lastName, userID]);
        return res.render('settings',{
            message: 'User details updated'
        });
    } catch (error) {
        // Handle any database errors
        console.error("Error updating user:", error);
        return res.render('settings',{
            message: 'Error updating user details'
        });
    }
}

module.exports = { 
    updateUser, 
};
