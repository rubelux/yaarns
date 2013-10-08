
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

       
        index: function(ac) {
       
            var caller = ac.config.get("caller");


             

            if("Content"==caller){
                //var tdataT = new Object(tdata);
                Y.log(' isObject(tdata)....................................'); 
                 
                 /*
                    { content: 'It\'s not always a given that festivals act as an extension of their 
                    locale\'s identity, but this year it was especially unclear whether Barcelona\'s 
                    Primavera Sound wanted to be known more as a Spanish music festival or a music 
                    festival that happens to take place in Spain. The booking of Spanish acts that 
                    possess a lower profile to the many travellers that come through for the festival suggested a sort of national allegiance; on the other hand, the low attendance that went along with these acts\' somewhat-buried sets suggested that representing a musical heritage is not the festival\'s highest priority. ',
                    title: '3st Part',
                    date: '22/12/13' }

                    { title: 'another fantastica subjet',
                      content: 'another fantastica subjet',
                      date: '12/22/22' }
                 */
                 
            
              
                ac.done({
                    "title"  : ac.config.get("title"),
                    "date"   : ac.config.get("date").toString(),
                    "content": ac.config.get("content")

                });
                  Y.log(' end ....................................'); 
            } else {
                 Y.log({"content": "I was called directly and have no parent." }); 
                ac.done({"content": "I was called directly and have no parent." });
            }
            
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-config-addon']});
