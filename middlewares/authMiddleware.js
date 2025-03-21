// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    } else{
        res.redirect('/login');
    }
};

const notAuthenticated = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    } else{
        return next();
    }
};

const isAdmin = (req, res, next) => {
    if (req.session.user.role === 'admin') {
        return next();
    } else {
        res.redirect('/dashboard');
    }
}

module.exports = {
    isAuthenticated,
    notAuthenticated,
    isAdmin,
}