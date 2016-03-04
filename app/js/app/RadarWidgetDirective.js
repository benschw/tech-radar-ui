'use strict';

goog.provide('demo.app.RadarWidgetDirectiveFactory');
goog.provide('demo.app.RadarWidgetDirective');

goog.require('demo.app.RadarWidgetCtrl');

/**
 * Draggable Directive Factory
 * @ngInject
 */
demo.app.RadarWidgetDirectiveFactory = function() {
	return new demo.app.RadarWidgetDirective();
};

/**
 * Radar Widget Directive
 * @constructor
 */
demo.app.RadarWidgetDirective = function() {
};

/**
 * @export
 */
demo.app.RadarWidgetDirective.prototype.controller = demo.app.RadarWidgetCtrl;

/**
 * @export
 */
demo.app.RadarWidgetDirective.prototype.templateUrl = 'app/tpl/radar-widget.html';

/**
 * @param {angular.Scope} scope
 * @param {angular.JQLite} element
 * @param {angular.Attributes} attr
 * @export
 */
demo.app.RadarWidgetDirective.prototype.link = function(scope, element, attr) {
	scope.host = attr['host'];
	scope.quadrant = attr['radar-widget'];
};

