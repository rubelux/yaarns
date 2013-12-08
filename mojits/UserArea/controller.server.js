/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('UserArea', function(Y, NAME) {

/**
 * The UserArea module.
 *
 * @module UserArea
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
            var req = ac.http.getRequest();


            if(req.user){
                ac.done({ username: req.user.username});
            }else{
                ac.done();
            }
            
            
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'mojito-http-addon']});
