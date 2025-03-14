const bcrypt = require('bcryptjs');
const pool = require('../config/dbconfig.js');
const queries = require('../db/queries.js');

// Update user details
const updateUser = async (req,res) => {
    const { firstName, lastName, oldPassword, newPassword, confirmPassword } = req.body;
    const userID = req.session.user.id;

    try {
        // update first name
        if (firstName) {
            await pool.query(queries.updateFirstName, [firstName, userID]);
        }

        // update last name
        if (lastName) {
            await pool.query(queries.updateLastName, [lastName, userID]);
        }

        // check new password
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                return res.render('settings', {
                    message: 'New Password does not match'
                });
            }

            // check old password
            const result = await pool.query(queries.getUserById,[userID])
            const user = result.rows[0];
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.render('settings', {
                    message: 'Invalid old password'
                });
            }

            // encrpt new password and update database
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await pool.query(queries.updatePassword, [hashedPassword, userID]);
        }

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
