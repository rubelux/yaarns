/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('Body', function(Y, NAME) {

/**
 * The Body module.
 *
 * @module Body
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {



        // "config":{
        //                     "children":{
        //                         "appArea":{
        //                             "type" : "AppArea"
        //                         },
        //                         "userArea":{
        //                             "type": "UserArea"
        //                         },
        //                         "storyArea":{
        //                             "type" : "StoryArea"
        //                         },
        //                         "content":{
        //                             "type": "Content"
        //                         },
        //                         "contentAddSubject":{
        //                             "type": "ContentAddSubject"
        //                         }


        //                     }
        //                 }

        index: function(ac) {
            var req = ac.http.getRequest();

            //this is the execute config object, by default the config objet is the one for application.json when user is undefinded
            //otherwise it will load this one
            var cfg = {
                children: {
                    "appArea":{
                        "type" : "AppArea",
                        action: "index"
                    },
                    "userArea":{
                        "type": "UserArea",
                        action: "index"
                    },
                    "storyArea":{
                        "type" : "StoryArea",
                        action: "index"
                    },
                    "content":{
                        "type": "Content",
                        action: "index"
                    },
                    "contentAddSubject":{
                        "type": "ContentAddSubject",
                        action: "index"
                    } 
                },
            
            assets: {}
            }; 
            
       
            if(req.user === undefined){ 
                ac.composite.done();
            }else{
                ac.composite.execute(cfg,function(data, meta){
                  
                   ac.done(data, meta);

                });
            }

        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-composite-addon', 'mojito-http-addon']});
