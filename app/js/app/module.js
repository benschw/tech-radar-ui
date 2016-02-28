'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.module');
goog.provide('demo.app.ModuleRun');

goog.require('cache.tpl');
goog.require('demo.app.Draggable');
goog.require('demo.app.ScrollOnClick');
goog.require('demo.app.Config');
goog.require('demo.app.HomeCtrl');
goog.require('demo.app.RadarCtrl');
goog.require('demo.app.EditorCtrl');
goog.require('demo.app.DetailsCtrl');

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

/*
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
	.controller('demo.app.HomeCtrl', demo.app.HomeCtrl)
	.controller('demo.app.RadarCtrl', demo.app.RadarCtrl)
	.controller('demo.app.EditorCtrl', demo.app.EditorCtrl)
	.controller('demo.app.DetailsCtrl', demo.app.DetailsCtrl)
	.directive('myDraggable', demo.app.Draggable)
	.directive('scrollOnClick', demo.app.ScrollOnClick);

