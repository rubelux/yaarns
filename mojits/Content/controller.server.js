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
                                "caller": "Content",
                                "tdata" : {
                                    content : "It's not always a given that festivals act as an extension of their locale's identity, but this year it was especially unclear whether Barcelona's Primavera Sound wanted to be known more as a Spanish music festival or a music festival that happens to take place in Spain. The booking of Spanish acts that possess a lower profile to the many travellers that come through for the festival suggested a sort of national allegiance; on the other hand, the low attendance that went along with these acts' somewhat-buried sets suggested that representing a musical heritage is not the festival's highest priority. " ,
                                    title   : "1st Part",
                                    date    : "22/12/13"
                                }
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
