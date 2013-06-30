var passport = require('passport'),
    LocalStrategy = require("passport-local").Strategy;


var users = [
    { id: 1, username: 'bob', password: 'bob', email: 'bob@example.com' }
  , { id: 2, username: 'joe', password: 'joe', email: 'joe@example.com' }
];

function findById(id, fn) {
  var idx = id - 1;
  if (users[idx]) {
    fn(null, users[idx]);
  } else {
    fn(new Error('User ' + id + ' does not exist'));
  }
}

function findByUsername(username, fn) {
  for (var i = 0, len = users.length; i < len; i++) {
    var user = users[i];
    if (user.username === username) {
      console.log("found username in findByUsername " + username);
      return fn(null, user);
    }
  }
  return fn(null, null);
}



// Passport session setup.
//   To support persistent login sessions, Passport needs to be able to
//   serialize users into and deserialize users out of the session.  Typically,
//   this will be as simple as storing the user ID when serializing, and finding
//   the user by ID when deserializing.
passport.serializeUser(function(user, done) {
  console.log(user.id + " In serializeUser "  + done.toString() );
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  findById(id, function (err, user) {
    done(err, user);
  });
});


passport.use(new LocalStrategy(function(username, password, done) {
      // Find the user by username.  If there is no user with the given
      // username, or the password is not correct, set the user to `false` to
      // indicate failure and set a flash message.  Otherwise, return the
      // authenticated `user`.
      findByUsername(username, function(err, user) {
        console.log("Trying to find username " + username );
        if (err) { return done(err); }
        if (!user) { return done(null, false, { message: 'Unknown user ' + username }); }
        if (user.password != password) { return done(null, false, { message: 'Invalid password' }); }
        console.log("password is correct");
        return done(null, user);
      });
}));

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
