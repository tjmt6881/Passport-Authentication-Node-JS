module.exports = {
    ensureAuthenticated: function(req, res, next) {
        if(req.isAuthenticated()){
            return next();
        }
        req.flash('error_msg', 'Please Log In To View The Resources!!!');
        res.redirect('/users/login');
    }
}