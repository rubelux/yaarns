/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('StoryAreaBinderIndex', function(Y, NAME) {

/**
 * The StoryAreaBinderIndex module.
 *
 * @module StoryAreaBinderIndex
 */

    /**
     * Constructor for the StoryAreaBinderIndex class.
     *
     * @class StoryAreaBinderIndex
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

            var target = node.one('#scrollAbleAre')
             ,  contentList = node.one('ul')
             ,  viewPortHeight = 0
             ,  contentHeigth = 0

                //get height 
             ,  scrollView = new Y.ScrollView({
                    id: "scrollview",
                    srcNode: target,
                    height: Y.DOM.winHeight(),
                    flick: {
                        minDistance:10,
                        minVelocity:0.3,
                        axis: "y"
                    }
                }).plug(Y.Plugin.ScrollViewScrollbars)
                  .render();

            
           // scrollView.render(); 

            var getHeight = function(){
                    
                    viewPortHeight = Y.DOM.winHeight();
                    contentHeigth  = contentList.get('scrollHeight');
                    
                    var q = contentHeigth - viewPortHeight

                    Y.log('disbabled2  '+  q);
                    Y.log('viewPortHeight  '+  viewPortHeight);
                    Y.log('contentHeigth  '+  contentHeigth);
                    

                    scrollView.set('height', Y.DOM.winHeight()  )
                    Y.log('scroll height' + scrollView.get('height'))

                    scrollView.render();

                    if(viewPortHeight < contentHeigth){
                       
                    }else{
                        scrollView.scrollbars.hide();
                    }
                };    


                

            Y.log('viewport height' + Y.one("body").get("winHeight"))
            Y.log('object scroll height'+ Y.one('#storyMenuInnerCont').get('scrollHeight'));
            Y.log('object scroll offsetHeight height'+ target.get('offsetHeight') );

            
            node.one('#storyTellersBt').on('mouseenter', function(e){
                var target = this.one('#storyTellersList ul')
                 ,  targetHeight = target.get('scrollHeight');

                this.one('a').addClass('active');
                target.addClass('pure-menu-open');
                target.setStyle('position', 'static');

                target.setStyle('height', '0');

                target.transition({
                    easing: 'ease-out',
                    duration: 0.5, // seconds
                    height: targetHeight+"px" , 
                }, function() {
                   // this.remove();
                });

                
            })

            node.one('#storyTellersBt').on('mouseleave', function(e){
                var target = this.one('#storyTellersList ul')
                 ,  targetHeight = target.get('scrollHeight')
                 ,  _this = this;


                
                

                target.transition({
                        easing: 'ease-in',
                        duration: 0.4, // seconds
                        height: "0px" , 
                }, function() {
                        _this.one('a').removeClass('active');
                        target.removeClass('pure-menu-open');
                        target.setStyle('position', '');
                        target.removeClass('active');
                        
                });

            })

            
            Y.on('windowresize', function(){Y.log('yess');
                getHeight()
            })

           
               

            
            
                
            var content = scrollView.get("contentBox"); 

            

                content.delegate("click", function(e) {
                    // Prevent links from navigating as part of a scroll gesture
                    if (Math.abs(scrollView.lastScrolledAmt) > 2) {
                        e.preventDefault();
                        Y.log("Link behavior suppressed.")
                    }
                }, "a");

                content.delegate("mousedown", function(e) {
                    // Prevent default anchor drag behavior, on browsers which let you drag anchors to the desktop
                    e.preventDefault();
                }, "a");
        }

    };

    /*


            YUI().use('scrollview', function(Y) {

                var scrollView = new Y.ScrollView({
                    id: "scrollview",
                    srcNode: '#scrollview-content',
                    height: 310,
                    flick: {
                        minDistance:10,
                        minVelocity:0.3,
                        axis: "y"
                    }
                });

                scrollView.render();
                
                var content = scrollView.get("contentBox"); 

                content.delegate("click", function(e) {
                    // Prevent links from navigating as part of a scroll gesture
                    if (Math.abs(scrollView.lastScrolledAmt) > 2) {
                        e.preventDefault();
                        Y.log("Link behavior suppressed.")
                    }
                }, "a");

                content.delegate("mousedown", function(e) {
                    // Prevent default anchor drag behavior, on browsers which let you drag anchors to the desktop
                    e.preventDefault();
                }, "a");
            });

        


    */

}, '0.0.1', {requires: ['event-resize',  "scrollview", 'event-mouseenter', 'mojito-client']});
