const express = require('express');
const router = express.Router();

const { 
    loginUser, 
    registerUser, 
    logoutUser, 
} = require('../controllers/authController');

const { 
    updateUser,
} = require('../controllers/userController');

const {
    isAuthenticated,
    notAuthenticated,
} = require('../middlewares/authMiddleware');

// end-points
router.get('/', (req, res) => {res.render('index', { isLoggedIn: req.isLoggedIn });});
router.get('/register',notAuthenticated, (req, res) => {res.render('register',{message: ''});});
router.get('/login',notAuthenticated, (req, res) => {res.render('login',{message: ''});});
router.get('/dashboard',isAuthenticated, (req, res) => {res.render('dashboard',{user:req.session.user});});
router.get('/profile',isAuthenticated, (req, res) => {res.render('profile',{message: ''});});
router.get('/logout',logoutUser);

router.post('/register',registerUser);
router.post('/login',loginUser);





/*
router.get('/api/user', controller.getUsers);
router.get('/api/user/user-id/:user_id',controller.getUserById);
router.get('/api/user/username/:username',controller.getUserByUsername);
router.post('/api/user',controller.addUser);
router.put('/api/user/:user_id',controller.updateUser);
router.delete('/api/:user_id',controller.deleteUser);

router.get('/dashboard', controller.getDashboard);
*/
module.exports = router;