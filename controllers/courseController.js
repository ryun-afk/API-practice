const course = require('../models/CourseModel');
async function getAllCourses(req,res) {
    try {
        const courses = await course.findAll();
        //res.json(courses);
        res.render('courses',{
            message: 'Success',
            courses: courses,
        });

    } catch (err) {
        //res.status.send('Error fetching courses');
        res.render('courses',{
            message: 'Error fetching courses',
            courses: 'empty',
        })
    }
}

module.exports = { 
    getAllCourses,
};
