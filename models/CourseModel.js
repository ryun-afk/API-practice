const BaseModel = require('./BaseModel');

class Course extends BaseModel {
    static tableName() {
        return 'public.courses'
    }

}

module.exports = Course;