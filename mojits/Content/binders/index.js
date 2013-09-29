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

            
        },

        /**
         * The binder method, invoked to allow the mojit to attach DOM event
         * handlers.
         *
         * @param node {Node} The DOM node to which this mojit is attached.
         */
        bind: function(node) {
            var root = this;
            root.node = node;

          
            /*var posFuntion = function(){
                Y.log('post function is called')
            }*/

            root.node.one(".addSubject").on('tap', function(e){

                Y.log('me clica');

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
                });
            });
            /**
             * Example code for the bind method:
             *
             * node.all('dt').on('mouseenter', function(evt) {
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).addClass('sel');
             *
             * });
             * node.all('dt').on('mouseleave', function(evt) {
             *   
             *   var dd = '#dd_' + evt.target.get('text');
             *   me.node.one(dd).removeClass('sel');
             *
             * });
             */
        }

    };

}, '0.0.1', {requires: ['event-tap', 'event-mouseenter', 'mojito-client']});
