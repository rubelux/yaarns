/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('AppArea', function(Y, NAME) {

/**
 * The AppArea module.
 *
 * @module AppArea
 */

    /**
     *  ZEN: needs to be connected to model
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

            
        },

        createStory : function(ac){

            
            Y.log('invoked............');
            Y.log(ac.params);

            Y.log(ac.params.getFromMerged('title'));

            Y.log('invoked............');

            ac.done();
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-params-addon', 'mojito-models-addon' , 'mojito-http-addon']});
