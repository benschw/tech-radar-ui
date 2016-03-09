'use strict';

goog.provide('demo.app.SaveDirectiveFactory');
goog.provide('demo.app.SaveDirective');


/**
 * @ngInject
 */
demo.app.SaveDirectiveFactory = function() {
	return new demo.app.SaveDirective();
};

/**
 * Radar Widget Directive
 * @constructor
 */
demo.app.SaveDirective = function() {
};

/**
 * @export
 */
demo.app.SaveDirective.prototype.templateUrl = 'app/tpl/save-button.html';



