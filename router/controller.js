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
        if (!results.rows.length===0){
            res.status(404).json({message:'User not found'});
        }
        res.status(200).json(results.rows);
    });
};

const addUser = (req, res) => {
    const {first_name, last_name, username, password} = req.body;
    pool.query(queries.addUser, [first_name, last_name, username, password], (error, results) => {
        if (error) {throw error;}
        res.status(201).json({message: 'User added to database'});
    });
};

const updateUser = (req, res)=> {
    const user_id = parseInt(req.params.user_id);
    const {first_name, last_name, username, password} = req.body;
    pool.query(queries.updateUser, [first_name, last_name, username, password, user_id], (error, results) => {
        if (error) {throw error;}
        if (!results.rows.length===0){
            res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User updated successfully'});
    });
}


const deleteUser = (req, res) => {
    const user_id = parseInt(req.params.user_id);
    pool.query(queries.deleteUser, [user_id],(error, results) => {
        if (error) {throw error;}
        if (!results.rows.length===0){
            res.status(404).json({message:'User not found'});
        }
        res.status(200).json({message:'User deleted successfully'});
    });
}


const signupUser = (req, res) => {
    let {first_name, last_name, username, password} = req.body;
    pool.query(queries.getUserByUsername, [username], (error, results) => {
        if (error) {throw error;}

        if (results.rows.length>0){
            res.status(409).json({message:'Username already exists'});
        }
        else{
            addUser(req,res);
        }
        
    });
}


module.exports = {
    getUsers,
    getUserById,
    addUser,
    updateUser,
    deleteUser,
    signupUser,
};