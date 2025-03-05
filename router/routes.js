const {Router} = require('express');
const controller = require('./controller');

const router = Router();

// end-points
router.get('/api/user', controller.getUsers);
router.get('/api/user/user-id/:user_id',controller.getUserById);
router.get('/api/user/username/:username',controller.getUserByUsername);
router.post('/api/user',controller.addUser);
router.put('/api/user/:user_id',controller.updateUser);
router.delete('/api/:user_id',controller.deleteUser);

router.post('/signup',controller.signupUser);
router.post('/login',controller.loginUser);


module.exports = router;