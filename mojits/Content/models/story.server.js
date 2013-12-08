/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('ContentModelStory', function(Y, NAME) {

    var mongodb = require('mongodb');
	var uri = 'mongodb://test:test@ds053128.mongolab.com:53128/yaarns1';

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
        
        var type = type || {};
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
                     
			mongodb.MongoClient.connect(uri, function (err, db) {
				if(err) throw err;
				
				var stories = db.collection('stories'),
					storytellers = db.collection('storytellers');
				
				stories.find(type).toArray(function (err, docs){
					if (err) throw err;
						
					callback({some:docs});
					
					db.close(function (err) {
						if(err) throw err;
					});
				});
			});
        }, 

        saveSubject: function(data, callback){
            Y.log('from saveSubject.......');
            Y.log(data);

			mongodb.MongoClient.connect(uri, function (err, db) {
				if(err) throw err;
				
				var stories = db.collection('stories'),
					storytellers = db.collection('storytellers');
				
				stories.insert(data, function (err, result) {
					if (err) throw err;
					
					callback({some:result[0]});
					
					db.close(function (err) {
						if(err) throw err;
					});
				});
			});
        }  

    };

}, '0.0.1', {requires: []});
