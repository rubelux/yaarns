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
            var ac = ac;
            var _this = this;

             /*var model = ac.models.get('ContentModelStory');

         
          
            model.search(function(data){
                 Y.log("from controler")
                 Y.log(data);
                 Y.log("--------from controler-----------------")
               
            }); */

            _this.cfg = {
                    view: "index",
                    children: {
                        contentText : {
                            type: "ContentText",
                            config: {
                                "caller": "Content",
                                "tdata" : {
                                    content : "It's not always a given that festivals act as an extension of their locale's identity, but this year it was especially unclear whether Barcelona's Primavera Sound wanted to be known more as a Spanish music festival or a music festival that happens to take place in Spain. The booking of Spanish acts that possess a lower profile to the many travellers that come through for the festival suggested a sort of national allegiance; on the other hand, the low attendance that went along with these acts' somewhat-buried sets suggested that representing a musical heritage is not the festival's highest priority. " ,
                                    title   : "1st Part",
                                    date    : "22/12/13"
                                }
                            }
                        },
                        contentText2 : {
                            type: "ContentText",
                            config: {
                                "caller": "Content",
                                "tdata" : {
                                    content : "It's not always a given that festivals act as an extension of their locale's identity, but this year it was especially unclear whether Barcelona's Primavera Sound wanted to be known more as a Spanish music festival or a music festival that happens to take place in Spain. The booking of Spanish acts that possess a lower profile to the many travellers that come through for the festival suggested a sort of national allegiance; on the other hand, the low attendance that went along with these acts' somewhat-buried sets suggested that representing a musical heritage is not the festival's highest priority. " ,
                                    title   : "2st Part",
                                    date    : "22/12/13"
                                }
                            }
                        },
                        contentText3 : {
                            type: "ContentText",
                            config: {
                                "caller": "Content",
                                "tdata" : {
                                    content : "It's not always a given that festivals act as an extension of their locale's identity, but this year it was especially unclear whether Barcelona's Primavera Sound wanted to be known more as a Spanish music festival or a music festival that happens to take place in Spain. The booking of Spanish acts that possess a lower profile to the many travellers that come through for the festival suggested a sort of national allegiance; on the other hand, the low attendance that went along with these acts' somewhat-buried sets suggested that representing a musical heritage is not the festival's highest priority. " ,
                                    title   : "3st Part",
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

                     

                ac.composite.execute(_this.cfg,function(data, meta){
                    // The 'meta' object containing metadata about the children's binders,
                    // assets, configuration, and HTTP header info is passed to the callback.
                    // This 'meta' object is required for binders to execute and attach content
                    // to the DOM.

                    Y.log(_this.cfg)
                    Y.log("--------");
                    var dataF = {
                        childrens: [

                        ]
                    };
                    dataF.childrens.push(data);

                   
                    ac.done({object: data}, meta);
                });

                this.getSubjects(ac);
            },

            //get all subjects from model 
            getSubjects : function(ac){
                var model = ac.models.get('ContentModelStory');

                //first attr is empty cos its no creatareia for the mongo find so it returns everything
                model.getStories({}, function(data){
                    Y.log("from getStories in controler content")
                    Y.log(data);
                    Y.log("--------from controler-----------------")
                });

               // ac.done();
            },


            saveSubject : function(ac){
                Y.log('yess from controler of content');

                var model = ac.models.get('ContentModelStory')

                 , rawSubject = {
                    creationTime : new Date(),
                    title        : ac.params.getFromMerged('title'),
                    content      : ac.params.getFromMerged('body'),
                    type         : "ContentText"
                }

                model.saveSubject(rawSubject , function(data){
                     Y.log("from controler")
                     Y.log(data);
                     Y.log("--------from controler-----------------")
                   
                });
               
                Y.log(ac.params.getFromMerged('title'));
                 Y.log('---content');
                 ac.done();
               // clearTimeout(ac._timer);
            }



    };

}, '0.0.1', {requires: ['mojito', 'mojito-composite-addon', 'mojito-params-addon', 'mojito-models-addon', 'ContentModelStory']});





