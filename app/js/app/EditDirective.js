'use strict';

goog.provide('demo.app.EditDirectiveFactory');
goog.provide('demo.app.EditDirective');


/**
 * @ngInject
 */
demo.app.EditDirectiveFactory = function() {
	return new demo.app.EditDirective();
};

/**
 * @constructor
 */
demo.app.EditDirective = function() {
};

/**
 * @export
 */
demo.app.EditDirective.prototype.templateUrl = 'app/tpl/edit-button.html';


