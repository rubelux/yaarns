/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Content', function(Y, NAME) {

/**
 * The Content module.
 *
 * @module Content
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
      
            var cfg = {
                    view: "index",
                    children: {
                        ContentText: {
                            type: "ContentText",
                            config: {
                                "caller": "Content"
                           }
                        }
                        
                    },
                    assets: {
                        top: {
                            css: [
                                "/static/ContentText/assets/index.css"
                            
                            ]
                        }
                    }
                };    

                ac.composite.execute(cfg,function(data, meta){
                    // The 'meta' object containing metadata about the children's binders,
                    // assets, configuration, and HTTP header info is passed to the callback.
                    // This 'meta' object is required for binders to execute and attach content
                    // to the DOM.
                    ac.done(data, meta);
                });
            }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-composite-addon']});
