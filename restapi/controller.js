const pool = require('../db.js');
const queries = require('./queries.js');

const getUsers = (req, res) => {
    pool.query(queries.getUsers, (error, results) => {
        if (error) {throw error;}
        res.status(200).json(results.rows);
    });
};

const getUserById = (req, res) => {
    const user_id = parseInt(req.params.user_id);
    pool.query(queries.getUserById, [user_id],(error, results) => {
        if (error) {throw error;}
        res.status(200).json(results.rows);
    });
};

const addUser = (req, res) => {
    const {first_name, last_name, username, password} = req.body;
    // check if fields are missing
    if (!first_name || !last_name || !username || !password) {
        res.status(400).send('Missing required fields');
    }   

    pool.query(queries.checkUsernameExists, [username], (error,results)=>{
        if (error) {throw error;}
        
        // check if username exists
        if (results){
            res.status(409).send('Username already exists');
        }
        else{
            pool.query(queries.addUser, [first_name, last_name, username, password], (error, results) => {
                if (error) {throw error;}
                res.status(201).send('User added to database');
            });
        }
        // add user to database
        
    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
};