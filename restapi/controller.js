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
    const { first_name, last_name, username, password } = req.body;

    pool.query(queries.checkUsernameExists, [username], (error,results)=>{
        // check if username exists
        if (error) {throw error;}
        if (results.rows.length > 0){
            res.status(409).send('Username already exists');
        }

        // add user to database
        pool.query(queries.addUser, [first_name, last_name, username, password], (error, results) => {
            if (error) {throw error;}
            res.status(201).send('User added with ID: ' + results.insertId);
            console.log('User added with ID: ' + results.insertId);
        });
    });
};

module.exports = {
    getUsers,
    getUserById,
    addUser,
};