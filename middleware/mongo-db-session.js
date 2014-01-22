var express = require('express')
 ,  mongoose = require('mongoose')
 ,  MongooseStore = require('express-mongodb')(express)
 ,  Session = mongoose.model('Session')
 ,  db = "mongodb://test:test@ds053128.mongolab.com:53128/yaarns1";

mongoose.connect(db);


var session = express.session({
    cookie: {
        maxAge: 31557600000
    },
    secret: "Wild Express-MongoDB",
    store: new MongooseStore()
})
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