const BaseModel = require('./BaseModel');

class CourseModel extends BaseModel {
    static tableName() {
        return 'public.courses'
    }

}

module.exports = CourseModel;