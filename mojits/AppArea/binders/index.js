/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('AppAreaBinderIndex', function(Y, NAME) {

/**
 * The AppAreaBinderIndex module.
 *
 * @module AppAreaBinderIndex
 */

    /**
     * Constructor for the AppAreaBinderIndex class.
     *
     * @class AppAreaBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            this.mojitProxy = mojitProxy;
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {

            this.node = node;
            
            var me                  = this.node
             ,  root                = this
             ,  clickOverBase       = this.node.one('#clickOverBase')
             ,  _isAnimated         = false
             ,  _isHovered          = false
             ,  formStoryCreationC  = this.node.one('#appMenuInnerForm')
             ,  formStoryCreationF  = this.node.one('#formStoryCreation')
             ,  createHistory       = this.node.one('#createHistory')
             ,  urlParams           = Y.mojito.util.copy(this.mojitProxy.context)
             ,  appMenuInnerCont    = root.node.one('#appMenuInnerCont');

            
            this.createStoryEvent = createHistory.on('click', function(e){
                
                var displayType = (appMenuInnerCont.hasClass('opened')) ? 'none' : 'block';

                formStoryCreationC.setStyles({
                    display: displayType
                });



                Y.later(100, this, function(){
                                    appMenuInnerCont.toggleClass('opened');
                    formStoryCreationC.toggleClass('openedf');    
                })
                


                
            });

            this.form = formStoryCreationF.one('form').on('submit', function(e){
              
                e.preventDefault();

                var _form = e.target; 
                

                //the inner object must be called body.
                var params = {
                    body  : {
                        title        : _form.one('#title').get('value'),  
                        gender       : _form.one('#gender').get('value'),
                        storyTellers : _form.one('#storyTellers').get('value'),
                        restricted   : _form.one('#restricted').get('checked')

                    }    
                } 

             
               
                
                //sends params to createStory on controller
                root.mojitProxy.broadcast('createStory', {params: params}, function(){Y.log('tryyyyyyyy ..........')});  

                root.mojitProxy.invoke('createStory', { params: params  }, function(err, markup){
                    if (err) throw err;

                    root.mojitProxy.refreshView({
                        params: {
                            ur: urlParams
                        }
                    }); 

                });

            });

        },

        //happens when the partial is refreshed
        onRefreshView : function(){
       
            this.createStoryEvent.detach(true);
            this.bind.apply(this, arguments);
        } 

    };

}, '0.0.1', {requires: ['event', 'mojito-client', 'transition']});
