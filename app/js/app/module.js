'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.module');
goog.provide('demo.app.ModuleRun');

goog.require('cache.tpl');
goog.require('demo.app.DraggableFactory');
goog.require('demo.app.RadarWidgetDirectiveFactory');
goog.require('demo.app.Config');
goog.require('demo.app.HomeCtrl');
goog.require('demo.app.RadarCtrl');
goog.require('demo.app.EditorCtrl');
goog.require('demo.app.DetailsCtrl');
goog.require('demo.app.RadarWidgetCtrl');

/**
 * Draggable Directive
 * @param  {*=} $rootScope
 * @param  {*=} $state
 * @param  {*=} $stateParams
 * @constructor
 * @ngInject
 */
demo.app.ModuleRun = function ($rootScope, $state, $stateParams) {
	$rootScope.$state = $state;
	$rootScope.$stateParams = $stateParams;
};

/**
 * @type {angular.Module} 
 */
demo.app.module = angular.module('demo.app', [
		'ngRoute',
		'ui.router',
		'ui.bootstrap',
		cache.tpl.name
	])
	.config(demo.app.Config)
	.run(demo.app.ModuleRun)
	.controller(demo.app.HomeCtrl.name, demo.app.HomeCtrl)
	.controller(demo.app.RadarCtrl.name, demo.app.RadarCtrl)
	.controller(demo.app.EditorCtrl.name, demo.app.EditorCtrl)
	.controller(demo.app.DetailsCtrl.name, demo.app.DetailsCtrl)
	.controller(demo.app.RadarWidgetCtrl.name, demo.app.RadarWidgetCtrl)
	.directive('myDraggable', demo.app.DraggableFactory)
	.directive('radarWidget', demo.app.RadarWidgetDirectiveFactory)

	;

