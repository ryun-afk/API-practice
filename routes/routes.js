require('dotenv').config()
const express = require('express');
const router = express.Router();

const { loginUser, registerUser, logoutUser } = require('../controllers/authController');
const { getAllCourses } = require('../controllers/courseController');
const { updateUser} = require('../controllers/userController');
const { isAuthenticated, notAuthenticated } = require('../middlewares/authMiddleware');

// end-points
router.get('/', (req, res) => {res.render('index');});
router.get('/dashboard',isAuthenticated, (req, res) => {res.render('dashboard',{user:req.session.user});});
router.get('/forum',isAuthenticated, (req, res) => {res.render('forum',{user:req.session.user});});
router.get('/settings',isAuthenticated, (req, res) => {res.render('settings',{message: ''});});
router.get('/logout',logoutUser);

router.get('/courses',isAuthenticated,getAllCourses);

router.get('/login',notAuthenticated, (req, res) => {res.render('login',{message: ''});});
router.get('/register',notAuthenticated, (req, res) => {res.render('register',{message: ''});});
router.post('/register',registerUser);
router.post('/login',loginUser);
router.post('/settings',isAuthenticated, updateUser);

module.exports = router;