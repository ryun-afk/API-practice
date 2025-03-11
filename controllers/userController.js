// Get user profile
const getUserProfile = async (req, res) => {
    try {
        const userId = req.session.user.id;
        const user = await pool.query(queries.getUserById, [userId]);

        if (user.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        res.render('profile', { user: user.rows[0] });
    } catch (error) {
        console.error('Get Profile Error:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};

// Update user details
const updateUser = async (req, res) => {
    const { first_name, last_name, username } = req.body;
    const userId = req.session.user.id;

    try {
        await pool.query(queries.updateUser, [first_name, last_name, username, userId]);
        res.redirect('/profile');
    } catch (error) {
        console.error('Update User Error:', error);
        res.status(500).json({ message: 'Failed to update user' });
    }
};

// Delete user account
const deleteUser = async (req, res) => {
    const userId = req.session.user.id;

    try {
        await pool.query(queries.deleteUser, [userId]);
        req.session.destroy();
        res.redirect('/register');
    } catch (error) {
        console.error('Delete User Error:', error);
        res.status(500).json({ message: 'Failed to delete account' });
    }
};

module.exports = { getUserProfile, updateUser, deleteUser };
