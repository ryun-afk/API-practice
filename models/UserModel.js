const BaseModel = require('./BaseModel');

class User extends BaseModel {
    constructor () {
        super('users');
    }

    async findByUsername(username) {
        const query = 'SELECT * FROM users WHERE username = $1';
        try {
            const res = await pool.query(query, [username]);
            return res.rows[0];
        } catch (err) {
            console.error('Error fetching user by username:', err.stack);
            throw err;
        }
    }
}

module. exports = new User();