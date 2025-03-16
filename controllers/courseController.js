const pool = require('../config/dbconfig.js');
const queries = require('../db/queries.js');

const getCourses = async (req, res) => {
    try {
        const result = await pool.query(queries.getCourses);
        console.log(result.rows);
        return res.render('courses',{
            message: 'Success',
            courses: result.rows
        });
    } catch (error) {
        console.error(error);
        return res.render('courses',{
            message: 'Internal Server Error',
            courses: 'empty'
        });
    }
};

module.exports = { 
    getCourses, 
};
