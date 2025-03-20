require('dotenv').config()

const express = require('express');
const session = require('express-session');
const path = require('path');
const route = require('./routes/routes.js');
const app = express();
const port = 3000;

// Session setup
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false, httpOnly: true, maxAge: 3600000 }
}));

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')))
app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

// Set EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

// Import routes
app.use('/', route);

// Start the server
app.listen(port, () => {
    console.log(`App listening at http://localhost:${port}`);
});
