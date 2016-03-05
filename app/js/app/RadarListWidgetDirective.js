'use strict';

goog.provide('demo.app.RadarListWidgetDirectiveFactory');
goog.provide('demo.app.RadarListWidgetDirective');

goog.require('demo.app.RadarListWidgetCtrl');

/**
 * @ngInject
 */
demo.app.RadarListWidgetDirectiveFactory = function() {
	return new demo.app.RadarListWidgetDirective();
};

/**
 * Radar Widget Directive
 * @constructor
 */
demo.app.RadarListWidgetDirective = function() {
};

/**
 * @export
 */
demo.app.RadarListWidgetDirective.prototype.controller = demo.app.RadarListWidgetCtrl;

/**
 * @export
 */
demo.app.RadarListWidgetDirective.prototype.templateUrl = 'app/tpl/radar-list-widget.html';


