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



         /*  _this.cfg = {
                    
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
                        }
                    },



                    assets: {
                        top: {
                            css: [
                                "/static/ContentText/assets/index.css"
                            
                            ]
                        }
                    }
                };    */

                

                   

                var model = ac.models.get('ContentModelStory');

                //first attr is empty because its null criteria for the mongo to find so it returns all data
                var dataFg =  model.getStories({}, function(data){
                 
                    var obChildrenFor  = _this.makeObject(data.some);

                    ac.composite.execute( obChildrenFor,  function(data, meta){
                            
                         
                        
                        ac.done(data , meta);

                          
                    });    
                
                       
                });

            
            },

            //get all subjects from model 
            getSubjects : function(ac){
             
               // ac.done();
            },

            makeObject : function(rawData){

                //var rawData =     
                  /*
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
                    */

                var _obForDynamicMojits = {}
                 ,  counter = 0;
               
                Y.Array.each(rawData, function(array, index){
                    
                    //if( index === undefined ) return;
                    //var rawData = JSON.parse(rawData[counter]);
                   var content = String(rawData[counter].content)
                     ,  date    = rawData[counter].creationTime;
                     //formating object
                    _obForDynamicMojits['contentText'+counter]                 = {};
                    _obForDynamicMojits['contentText'+counter].type            = "ContentText";
                    _obForDynamicMojits['contentText'+counter].config          = {};
                    _obForDynamicMojits['contentText'+counter].config.caller   = "Content";
                    _obForDynamicMojits['contentText'+counter].config.content  = rawData[counter].content;
                    _obForDynamicMojits['contentText'+counter].config.title    = rawData[counter].title;
                    _obForDynamicMojits['contentText'+counter].config.date     = date.getDay() + '/' + date.getMonth() + '/' + date.getFullYear();
                
                     counter++
                 
                   

                });



                var cfg = {};
                    
                    cfg.children = _obForDynamicMojits;
                    cfg.assets = {};
                    cfg.assets.top = {};
                    cfg.assets.top.css = ["/static/ContentText/assets/index.css"];

                return cfg;

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
                    
                     Y.log(data);
                     
                   
                });
               
                Y.log(ac.params.getFromMerged('title'));
                 Y.log('---content');
                 //ac.done();
               // clearTimeout(ac._timer);
            }



    };

}, '0.0.1', {requires: ['mojito', 'json-parse', 'mojito-config-addon', 'mojito-composite-addon', 'mojito-params-addon', 'mojito-models-addon', 'ContentModelStory']});





