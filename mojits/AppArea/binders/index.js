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
            var me = this;
            this.node = node;
            this._isAnimated = false;
           
            node.on('mouseenter', function(e){
                   
                    var _this = e.target
                     ,  classTarget = 'appMenuClose';

                    if(this.isAnimated){ return };
                     Y.log('entra')
                    if(_this.hasClass(classTarget)){this.removeClass(classTarget)};
                    this._isAnimated =true;

                    _this.transition({
                        easing: 'ease-out',
                        duration: 0.3, // seconds
                        width: '200px'
                    }, function() {
                        _this.addClass('appMenuOpen');
                        this._isAnimated = false;
                        Y.log('pasa')
                    
                    });
                });

            node.on('mouseleave', function(e){
                   
                var _this = e.target
                 ,  classTarget = 'appMenuOpen';

                    if(this.isAnimated){ return };
                     Y.log('entra')
                    if(_this.hasClass(classTarget)){this.removeClass(classTarget)};
                    this._isAnimated =true;

                    _this.transition({
                        easing: 'ease-in',
                        duration: 0.4, // seconds
                        width: '86px'
                    }, function() {
                        _this.setAttribute('style', '')
                        _this.addClass('appMenuClose');
                        this._isAnimated = false;
                        Y.log('pasa')
                    
                    });
                });




           
        }

    };

}, '0.0.1', {requires: ['event', 'mojito-client', 'transition']});
