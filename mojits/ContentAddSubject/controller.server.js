/*jslint anon:true, sloppy:true, nomen:true*/
YUI.add('ContentAddSubject', function(Y, NAME) {

/**
 * The ContentAddSubject module.
 *
 * @module ContentAddSubject
 */

    /**
     * Constructor for the Controller class.
     *
     * @class Controller
     * @constructor
     */
    Y.namespace('mojito.controllers')[NAME] = {

        /**
         * Method corresponding to the 'index' action.
         *
         * @param ac {Object} The ActionContext that provides access
         *        to the Mojito API.
         */
        index: function(ac) {
            ac.models.get('ContentAddSubjectModel').getData(function(err, data) {
                if (err) {
                    ac.error(err);
                    return;
                }
                ac.assets.addCss('./index.css');
                ac.done({
                    status: 'Mojito is working.',
                    data: data
                });
            });
        },

        saveSubject: function(ac){
            Y.log('invoked............');
            Y.log(ac.params);

            Y.log('invoked............');
            ac.done();
        }

    };

}, '0.0.1', {requires: ['mojito', 'mojito-assets-addon', 'mojito-models-addon', 'ContentAddSubjectModel']});