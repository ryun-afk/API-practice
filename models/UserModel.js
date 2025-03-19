const BaseModel = require('./BaseModel');

class User extends BaseModel {
    static tableName() {
        return 'public.users';
    }

}

module.exports = User;