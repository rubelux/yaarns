var passport = require('passport');
//module.exports = passport.session();


var passport_session = passport.session();

/**
module.exports = function (req, res, next) {
    // we want to take control of the middleware so we can
    // initialize and also attach passport into req object
    req.passport.session();
    
    next();
};
**/


module.exports = function (req, res, next) {
    // we want to take control of the middleware so we can
    // initialize and also attach passport into req object
    passport_session(req, res, function (err) {
        if (err) {
            return next(err);
        }
        // Not sure if i attach to anything
        console.log("passport session user " + req._passport.session.user);

        // returning control back to mojito flow
        next();
    });
};