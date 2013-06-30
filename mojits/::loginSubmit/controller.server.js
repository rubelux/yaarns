/*
 * Copyright (c) 2012 Yahoo! Inc. All rights reserved.
 */
/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('loginSubmit', function(Y, NAME) {

/**
 * The loginSubmit module.
 *
 * @module loginSubmit
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
              ac.done({
                    status: 'Mojito is working.'
            });
        },


        
        "submit": function(ac){
            
            Y.log('entra en login submittt.......')
            var http = ac.http;
            req = ac.http.getRequest();
            res = ac.http.getResponse();
            
            var req = ac.http.getRequest(), passport = req.passport;
            // you can do whatever you want here with the
            // passport reference
            
            
            passport.authenticate('local', function(err, user, info) {
                if (err) { ac.error(err); return;}
                if (!user) {
                  //req.flash('error', info.message);
                  Y.log('this user doesnt exits')
                  return http.redirect('/');
                }
                req.logIn(user, function(err) {
                    if (err) { ac.error(err); return;}
                    
                        console.log("Session info: " + Y.dump(req.session) )
                        console.log( "User ID logged in: " + user.id);
                        return http.redirect('/');
                });
            })(req, res, function(req, res) {
                console.log( "Username logged in: " +req.user.name);
                ac.http.redirect("/");
            });
          
        }

    };

}, '0.0.1', {requires: ['mojito',  'passport', 'mojito-http-addon']});
