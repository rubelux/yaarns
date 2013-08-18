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
            Y.log('ssooooooo');
            var caller = ac.config.get("caller");
            if("Content"==caller){
                ac.done({ "content": "It's not always a given that festivals act as an extension of their locale's identity, but this year it was especially unclear whether Barcelona's Primavera Sound wanted to be known more as a Spanish music festival or a music festival that happens to take place in Spain. The booking of Spanish acts that possess a lower profile to the many travellers that come through for the festival suggested a sort of national allegiance; on the other hand, the low attendance that went along with these acts' somewhat-buried sets suggested that representing a musical heritage is not the festival's highest priority. " + caller + "."});
            } else {
                ac.done({"content": "I was called directly and have no parent." });
            }
            
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-config-addon']});
