const bcrypt = require('bcryptjs');
const UserModel = require('../models/UserModel');

// Update user details
const updateUser = async (req,res) => {
    try {
        const { first_name, last_name, oldPassword, newPassword, confirmPassword } = req.body;
        const user_id = req.session.user.id;

        // update first name
        if (first_name) {
            await UserModel.update({ first_name }, { user_id });
        }

        // update last name
        if (last_name) {
            await UserModel.update({ last_name }, { user_id });
        }

        // update password
        if (newPassword || confirmPassword) {
            if (newPassword !== confirmPassword) {
                return res.render('settings', {
                    message: 'New Password does not match'
                });
            }

            // check old password
            const user = await UserModel.findOne({user_id});
            const isPasswordValid = await bcrypt.compare(oldPassword, user.password);
            if (!isPasswordValid) {
                return res.render('settings', {
                    message: 'Invalid old password'
                });
            }

            // encrpt new password and update database
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            await UserModel.update({password: hashedPassword}, {user_id});
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
