'use strict';

goog.provide('demo.app.DetailsWidgetDirectiveFactory');
goog.provide('demo.app.DetailsWidgetDirective');

goog.require('demo.app.DetailsWidgetCtrl');

/**
 * @ngInject
 */
demo.app.DetailsWidgetDirectiveFactory = function() {
	return new demo.app.DetailsWidgetDirective();
};

/**
 * Details Widget Directive
 * @constructor
 */
demo.app.DetailsWidgetDirective = function() {
};

/**
 * @export
 */
demo.app.DetailsWidgetDirective.prototype.controller = demo.app.DetailsWidgetCtrl;

/**
 * @export
 */
demo.app.DetailsWidgetDirective.prototype.templateUrl = 'app/tpl/details-widget.html';


