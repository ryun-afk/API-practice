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
router.get('/', (req, res) => {res.render('index.ejs');});
router.get('/register',notAuthenticated, (req, res) => {res.render('register',{message: ''});});
router.get('/login',notAuthenticated, (req, res) => {res.render('login',{message: ''});});
router.get('/dashboard',isAuthenticated, (req, res) => {res.render('dashboard',{user:req.session.user});});
router.get('/profile',isAuthenticated, (req, res) => {res.render('profile',{message: ''});});
router.get('/logout',logoutUser);

router.post('/register',registerUser);
router.post('/login',loginUser);

module.exports = router;