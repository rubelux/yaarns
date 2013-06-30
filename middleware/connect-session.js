var express = require('express');


session = express.session({ secret: 'keyboard cat', key: 'sid', cookie: { secure: false }})


module.exports = function (req, res, next) {
    
    // we want to take control of the middleware so we can
    // initialize and also attach passport into req object
    session(req, res, function (err) {
        if (err) {
            return next(err);
        }
        // returning control back to mojito flow
        next();
    });
    
    
    
    
    
};
