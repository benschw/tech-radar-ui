'use strict';

goog.provide('demo.app.module');

goog.require('cache.tpl');
goog.require('demo.app.DraggableFactory');
goog.require('demo.app.RadarServiceFactory');
goog.require('demo.app.ParamServiceFactory');
goog.require('demo.app.RadarWidgetDirectiveFactory');
goog.require('demo.app.RadarListWidgetDirectiveFactory');
goog.require('demo.app.DetailsWidgetDirectiveFactory');
goog.require('demo.app.EditorCtrl');
goog.require('demo.app.DetailsWidgetCtrl');
goog.require('demo.app.RadarWidgetCtrl');
goog.require('demo.app.EditDirectiveFactory');
goog.require('demo.app.SaveDirectiveFactory');

goog.require('demo.app.markdown.module');

/**
 * @type {angular.Module} 
 */
demo.app.module = angular.module('demo.app', [
		'ngRoute',
		'ui.bootstrap',
		'ngSanitize',
		demo.app.markdown.module.name,
		cache.tpl.name
	])
	.controller(demo.app.EditorCtrl.name, demo.app.EditorCtrl)
	.controller(demo.app.DetailsWidgetCtrl.name, demo.app.DetailsWidgetCtrl)
	.controller(demo.app.RadarWidgetCtrl.name, demo.app.RadarWidgetCtrl)
	.directive('myDraggable', demo.app.DraggableFactory)
	.directive('radarWidget', demo.app.RadarWidgetDirectiveFactory)
	.directive('radarListWidget', demo.app.RadarListWidgetDirectiveFactory)
	.directive('radarDetailsWidget', demo.app.DetailsWidgetDirectiveFactory)
	.directive('radarEditButton', demo.app.EditDirectiveFactory)
	.directive('radarSaveButton', demo.app.SaveDirectiveFactory)
	.factory('radarService', demo.app.RadarServiceFactory)
	.factory('paramService', demo.app.ParamServiceFactory)

	;

