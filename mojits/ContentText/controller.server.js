/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('ContentText', function(Y, NAME) {

/**
 * The ContentText module.
 *
 * @module ContentText
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
            
            var caller = ac.config.get("caller");
            if("Content"==caller){
                ac.done({ "content": "I have been dynamically defined and run by " + caller + "."});
            } else {
                ac.done({"content": "I was called directly and have no parent." });
            }
            
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-config-addon']});
