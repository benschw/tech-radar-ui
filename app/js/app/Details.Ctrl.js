'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.DetailsCtrl');

/**
 * Home controller
 * @param  {angular.Scope=} $scope
 * @param {*=} $scope
 * @param {*=} $stateParams
 * @param {*=} quadrant
 * @constructor
 * @ngInject
 */
demo.app.DetailsCtrl = function($scope, $state, $stateParams, quadrant) {
	var view;
	var title;
	if ($stateParams.quadrant == 'techniques') {
		view = 'tl';
		title = 'Techniques';
	} else if ($stateParams.quadrant == 'tools') {
		view = 'tr';
		title = 'Tools';
	} else if ($stateParams.quadrant == 'platforms') {
		view = 'bl';
		title = 'Platforms';
	} else if ($stateParams.quadrant == 'languages') {
		view = 'br';
		title = 'Languages & Frameworks';
	}

	$scope.quadrant = quadrant

	var newMarker = function(id, mod) {
		return {
			"id": id,
			"title": "New Item "+id,
			"deg": Math.round(Math.random() * 90 + mod),
			"mag": Math.round(Math.random() * 100),
			"new": Math.round(Math.random()) === 1,
		};
	};

	$scope.marker = newMarker($stateParams.id, 0);

};


