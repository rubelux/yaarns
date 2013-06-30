var passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy;

passport.use(new LocalStrategy(
    function(username, password, done) {
       
         // done(null, { id: 'demo', name: 'caridy' });

        User.findOne({ username: username }, function(err, user) {
            if (err) { return done(err); }
            if (!user) {
                done(null, false, { message: 'Incorrect username.' });
            }
            if (!user.validPassword(password)) {
                done(null, false, { message: 'Incorrect password.' });
            }
            done(null, user);
        })
    }
));

var initialize = passport.initialize();

module.exports = function (req, res, next) {
    // we want to take control of the middleware so we can
    // initialize and also attach passport into req object
    initialize(req, res, function (err) {
        if (err) {
            return next(err);
        }
        // attaching passport object into req.passport
        // so this could be used at the controller level
        req.passport = passport;
        // returning control back to mojito flow
        next();
    });
};