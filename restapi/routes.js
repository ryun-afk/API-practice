const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/api', controller.getUsers);
router.get('/api/:user_id',controller.getUserById);
router.post('/signup',controller.addUser);
router.delete('/api/:user_id',controller.deleteUser);

module.exports = router;