var express = require('express');


cookieParser = express.cookieParser()

/**
 *  If you are looking around at examples that are using Connect and Express 
 * this code structure is equivalent to:
 * 
 * connect()
  .use(connect.cookieParser())
  
  or for Express
  
  app.use(express.cookieParser());
  
 * 
 * 
 * 
 * 
 * @param {Object} req
 * @param {Object} res
 * @param {Object} next
 */



module.exports = function (req, res, next) {
    
    // we want to take control of the middleware so we can
    // initialize and also attach passport into req object
    cookieParser(req, res, function (err) {
        if (err) {
            return next(err);
        }
        // returning control back to mojito flow

        next();
    });
    
    
    
    
    
};