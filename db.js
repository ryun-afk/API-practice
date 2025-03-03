const {Pool} = require('pg');
require('dotenv').config();

// Database connection setup
const pool = new Pool({
    user: process.env.DB_USER,
    host: process.env.DB_HOST,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD,
    port: process.env.DB_PORT
})

// exports pool for other files to use
module.exports = pool;

// Test the connection
/*pool.query('Select * from users',(err,result)=>{
    console.log(err,result);
})
*/