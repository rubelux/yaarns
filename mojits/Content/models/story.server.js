/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('ContentModelStory', function(Y, NAME) {

    var mongodb = require('mongodb');    

/**
 * The ContentModelFoo module.
 *
 * @module Content
 */

    /**
     * Constructor for the ContentModelFoo class.
     *
     * @class ContentModelFoo
     * @constructor
     */
    Y.namespace('mojito.models')[NAME] = {

        init: function(config) {
            this.config = config;
        },

        /**
         * Method that will be invoked by the mojit controller to obtain data.
         *
         * @param callback {function(err,data)} The callback function to call when the
         *        data has been retrieved.
         */
        getData: function(callback) {
            callback(null, { some: 'data' });
        },

        getStories: function (type, callback) {
          
        var type = type || {}
         /*   var server = new mongodb.Server("127.0.0.1", 27017, {});
            var dbTest = new mongodb.Db('unTestDB', server, {});

           // Y.log(server)

            dbTest.open(function (error, client) {
                if (error) throw error;

                var collection = new mongodb.Collection(client, 'personas');
  
                 var resultP =  collection.find({'nombre': 'pepe'}).toArray(function(err, docs) {
                    if (error) throw error;

                    //imprimimos en la consola el resultado
            
                    //retuValue(docs)
                    callback ({some:docs});
                });
                
                
            })  */

            /*
                
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
            */

                        

            var server = new mongodb.Server('ds029798.mongolab.com', 29798, {auto_reconnect : true});
            var db     = new mongodb.Db('habbendb', server, {});

            console.log(db)              

            db.open(function(err, client) {
                
                if (err) throw err;

                client.authenticate('habben_user', 'habbenps', function(err, success) {
                    
                    if (err) throw err;
                   
                    client.createCollection('stories', function(err, col){
                        if (err) throw err;
                        
                            
                                   var resultp = col.find(type).toArray(function(error, records){
                                    if (err) throw err;
                                    
                                     callback({some:records});
                                    db.close();
                                  }); 

                            

                            })


                        
                          
                    });
            });

           callback({some:'nothing'});

        }, 

        saveSubject: function(data, callback){
            Y.log('from saveSubject.......');
            Y.log(data);

            var server = new mongodb.Server('ds029798.mongolab.com', 29798, {auto_reconnect : true})
             ,  db     = new mongodb.Db('habbendb', server, {safe:false})
             ,  data   = data;

                         

            db.open(function(err, client) {
                
                if (err) throw err;

                client.authenticate('habben_user', 'habbenps', function(err, success) {
                    
                    if (err) throw err;
                   
                    client.createCollection('stories', function(err, col){
                        if (err) throw err;
                        
                            
                        col.insert( data,  function(err, records){
                                
                                    callback ({some:records[0]});
                                    db.close();
                                 
                        });
                    })
                });
            });
        }  

    };

}, '0.0.1', {requires: []});
