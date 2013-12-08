/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('ContentBinderIndex', function(Y, NAME) {

/**
 * The ContentBinderIndex module.
 *
 * @module ContentBinderIndex
 */

    /**
     * Constructor for the ContentBinderIndex class.
     *
     * @class ContentBinderIndex
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

            Y.log('.................................. Im in init content bind ......................................')
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var root = this
             ,  urlParams = Y.mojito.util.copy(this.mojitProxy.context)
             ,  addSubjectBt = node.one(".addSubject");

            Y.log('.................................. Im in init content bind  ......................................') 

            root.node = node;

            this.addSubjectButton = root.node.one(".addSubject").on('tap', function(e){

                Y.log('Im inside .addSubject button');
                root.mojitProxy.broadcast('openAddSubject', {url: 'text'});  
            
            });

            var container  = root.node.one('#container')
             ,  items      = container.all('.item')
             ,  totalWidth = 0;

            Y.log(container);

            Y.each(items, function(item){
                
                item.setStyles({
                    position: 'absolute',
                    left: totalWidth + 'px',
                    top: '0px'
                }); 

                totalWidth += item.get('offsetWidth');

            });

            container.setStyles({
                position : 'relative',
                width    : totalWidth + 'px',
                height   : container.get('winHeight')
             });



            root.mojitProxy.listen('saveSubject', function(data){
                var params = data.data.params;
              
                root.mojitProxy.invoke('saveSubject', { params: params  }, function(err, markup){
                    if (err) throw err;

                    root.mojitProxy.broadcast('closeAddSubject', {state: 'all good'});

                    root.mojitProxy.refreshView({
                        params: {
                            ur: urlParams
                        }
                    });

                });
            });
          
        },
        onRefreshView : function(){
            Y.log('---------------------------------------refreshed------------------------------------------------------------');

            this.mojitProxy.unlisten('saveSubject');
            this.addSubjectButton.detach(true);
            this.bind.apply(this, arguments);
        }

    };

}, '0.0.1', {requires: ['event-tap', 'event-mouseenter', 'mojito-client']});
