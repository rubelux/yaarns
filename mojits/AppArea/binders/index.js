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
            

            var me = this.node
             ,  clickOverBase = this.node.one('#clickOverBase')
             ,  _isAnimated   = false
             ,  _isHovered    = false;

            function animation(action, target){
                
                if(_isAnimated){ return };
                    _isAnimated =true;

                switch(action){
                    case 'open':

                    target.transition({
                        easing: 'ease',
                        duration: 0.3, // seconds
                        marginLeft: '0'
                    }, function() {
                        _isAnimated = false;
                        
                    });

                    break;

                    case 'close':
                    Y.log(_isHovered)
                   // if(_isHovered)return;

                    target.transition({
                        easing: 'ease',
                        duration: 0.2, // seconds
                        marginLeft: '-114px'
                    }, function() {
                        target.setAttribute('style', '')
                      
                        _isAnimated = false;
                    });

                    break;
                }
                
            } 

            //base menu
            
            clickOverBase.on('mouseenter', function(e){
                _isHovered = true;
                e.stopPropagation();
                e.preventDefault();

                var _this = e.target
                 ,  classTarget = 'appMenuClose';

                
                 
                animation('open', me.one('#appMenuInnerCont'))
                openMenu = true;
            });

            clickOverBase.on('mouseout', function(e){
                
                e.stopPropagation();
                e.preventDefault();

                var _this = e.target
                 ,  classTarget = 'appMenuOpen';

                animation('close', me.one('#appMenuInnerCont')) 
                _isHovered = false;
            });


            //bottons

            this.node.delegate('click', function(e){
                //
                Y.log('this  '+ e.currentTarget)
            }, 'li');

             this.node.delegate('mouseenter', function(e){
                _isHovered = true;
                e.stopPropagation();
                e.preventDefault();
                
                if(_isAnimated){ return };
                    animation('open', me.one('#appMenuInnerCont'))
            }, 'li');

            this.node.delegate('mouseout', function(e){
                
                e.stopPropagation();
                e.preventDefault();

                if(_isAnimated){ return };
                    animation('close', me.one('#appMenuInnerCont'))

                _isHovered = false;     
            }, 'li'); 
        }

    };

}, '0.0.1', {requires: ['event', 'mojito-client', 'transition']});
