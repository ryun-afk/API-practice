const pool = require('../db.js');
const queries = require('./queries.js');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) {throw error;}
        return res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const user_id = parseInt(req.params.user_id);

    pool.query(queries.getUserById, [user_id],(error, results) => {
        if (error) {throw error;}
        if (results.rows.length===0){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).json(results.rows);
    });
};

const getUserByUsername = (req, res) => {
    const username = req.params.username;
    
    pool.query(queries.getUserByUsername, [username],(error, results) => {
        if (error) {throw error;}

        if (results.rows.length===0){
            return res.status(404).json({message:'User not found'});
        }
        return res.status(200).json(results.rows);
    });
};

const addUser = (req, res) => {
    const {first_name, last_name, username, password} = req.body;
    
    pool.query(queries.getUserByUsername, [username],(error, results) => {
        if (error) {throw error;}

        if (results.rows.length > 0) {
            return res.status(409).json({ message: 'Username is taken' });
        }
        else {
            pool.query(queries.addUser, [first_name, last_name, username, password], (error, results) => {
                if (error) {throw error;}
        
                return res.status(201).json({ message: 'User created successfully' });
            });
        }
    });
};

const updateUser = (req, res)=> {
    const user_id = parseInt(req.params.user_id);
    const {first_name, last_name, username, password} = req.body;

    pool.query(queries.updateUser, [first_name, last_name, username, password, user_id], (error, results) => {
        if (error) {throw error;}

        if (results.rows.length===0){
            return res.status(404).json({message:'User not found'});
        }
        else{
            return res.status(200).json({message:'User updated successfully'});
        }
        
    });
}

const deleteUser = (req, res) => {
    const user_id = parseInt(req.params.user_id);

    pool.query(queries.deleteUser, [user_id],(error, results) => {
        if (error) {throw error;}

        if (results.rows.length===0){
            return res.status(404).json({message:'User not found'});
        }
        else {
            return res.status(200).json({message:'User deleted successfully'});
        }
    });
}

const signupUser = (req, res) => {
    let {first_name, last_name, username, password} = req.body;
    
    pool.query(queries.getUserByUsername, [username],(error, results) => {
        if (error) {throw error;}

        if (results.rows.length > 0) {
            return res.status(409).json({ message: 'Username is taken' });
        }
        else {
            pool.query(queries.addUser, [first_name, last_name, username, password], (error, results) => {
                if (error) {throw error;}
        
                return res.status(201).json({ message: 'User created successfully' });
            });
        }
    });
};


const loginUser = (req, res) => {
    const { username, password } = req.body;

    pool.query(queries.getUserByUsername, [username], (error, results) => {
        if (error) {throw error;}

        if (results.rows.length === 0) {
            return res.status(404).json({ message: 'User not found' });
        }

        const user = results.rows[0];

        if (user.password !== password) {
            return res.status(401).json({ message: 'Incorrect password' });
        }

        return res.status(200).json({ message: 'Login successful' });
    });
};


module.exports = {
    getUsers,
    getUserById,
    getUserByUsername,
    addUser,
    updateUser,
    deleteUser,
    signupUser,
    loginUser,
};