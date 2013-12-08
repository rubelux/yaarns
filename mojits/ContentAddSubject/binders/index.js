/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('ContentAddSubjectBinderIndex', function(Y, NAME) {

/**
 * The ContentAddSubjectBinderIndex module.
 *
 * @module ContentAddSubjectBinderIndex
 */

    /**
     * Constructor for the ContentAddSubjectBinderIndex class.
     *
     * @class ContentAddSubjectBinderIndex
     * @constructor
     */
    Y.namespace('mojito.binders')[NAME] = {

        /**
         * Binder initialization method, invoked after all binders on the page
         * have been constructed.
         */
        init: function(mojitProxy) {
            var root = this;
            root.mojitProxy = mojitProxy;


           
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var root       = this
             ,  form       = node.one('#addSubjectForm')
             ,  addSubject = node.one('.addSubject')
             ,  modal      = node.one('.overlayC')
             ,  blackOver  = node.one('.overlay')
             ,  urlParams  = Y.mojito.util.copy(this.mojitProxy.context); 

            root.node = node;
            root.mojitProxy = this.mojitProxy;

            this.form = form.on('submit', function(e){
                e.preventDefault();
              
                //the inner object must be called body.
                var params = {
                    body  : {
                        title : form.one('#title').get('value'),  
                        body  : form.one('#body').get('value') 
                    }    
                } 

                Y.log('----------------------------------------------------Im saveSubject--------------------')
                //send subject data to content bind.js, so its binding can invoke its control and then pass to model into database
                root.mojitProxy.broadcast('saveSubject', {params: params}, function(){Y.log('tryyyyyyyy ..........')});  

               /* root.mojitProxy.refreshView({
                    params: {
                        ur: urlParams
                    }
                }); */ 
            });

            this.blackOver = blackOver.on('click', function(e){

                modal.setStyle('display','none');

            });  


            root.mojitProxy.listen('openAddSubject', function(data){
                Y.log('Im openeend')
                modal.setStyle('display','block');
            });

            root.mojitProxy.listen('closeAddSubject', function(data){
                Y.log('closing')
                modal.setStyle('display','none');
            });



            

        },
        onRefreshView : function(){
            Y.log('---------------------------------------refreshed form------------------------------------------------------------');

            this.blackOver.detach(true);
            this.form.detach(true);
            this.bind.apply(this, arguments);
        }

    };

}, '0.0.1', {requires: ['event-mouseenter', 'mojito-client']});