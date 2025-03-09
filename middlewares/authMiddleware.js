// Middleware to check if the user is authenticated
const isAuthenticated = (req, res, next) => {
    if (req.session.user) {
        return next();
    }
    res.redirect('/login');
};

const notAuthenticated = (req, res, next) => {
    if (req.session.user) {
        res.redirect('/dashboard');
    }
    return next();
    
};

module.exports = {
    isAuthenticated,
    notAuthenticated,
}