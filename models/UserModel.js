const BaseModel = require('./BaseModel');

class UserModel extends BaseModel {
    static tableName() {
        return 'public.users';
    }

}

module.exports = UserModel;