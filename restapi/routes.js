const {Router} = require('express');
const controller = require('./controller');

const router = Router();

router.get('/api', controller.getUsers);
router.get('/api/:user_id',controller.getUserById);
router.post('/signup',controller.addUser);

module.exports = router;