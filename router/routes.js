const {Router} = require('express');
const controller = require('./controller');

const router = Router();

/*
GET, POST, PUT, DELETE with curl
curl -X <HTTP_METHOD> http://localhost:3000/api/user

examples:
    curl -X GET http://localhost:3000/api/user
    curl -X GET http://localhost:3000/api/user/1
    
    curl -X POST http://localhost:3000/api/user
    -H 'Content-Type: application/json'
    -d '{"first_name":"Alice","last_name":"Johnson","username":"ajohnson","password":"xyz"}'

    curl -X PUT http://localhost:3000/api/user/15
    -H 'Content-Type: application/json'
    -d '{"first_name":"xyz","last_name":"xyz","username":"xyz","password":"xyz"}' 

    curl -X DELETE http://localhost:3000/api/15
*/

// api end-points
router.get('/api/user', controller.getUsers);
router.get('/api/user/:user_id',controller.getUserById);
router.post('/api/user',controller.addUser);
router.put('/api/user/:user_id',controller.updateUser);
router.delete('/api/:user_id',controller.deleteUser);

router.post('/signup',controller.addUser);
router.post('/login',controller.addUser);


module.exports = router;