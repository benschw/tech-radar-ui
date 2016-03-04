'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.DetailsCtrl');

/**
 * Home controller
 * @param {angular.Scope} $scope
 * @param {*} $state
 * @param {*} $stateParams
 * @param {string} quadrant
 * @constructor
 * @ngInject
 */
demo.app.DetailsCtrl = function($scope, $state, $stateParams, quadrant) {
	var view  = demo.app.radar.Quadrants.lookupSlug($stateParams.quadrant);
	var title = demo.app.radar.Quadrants.getTitle(view);

	/**
	 * @type {*}
	 * @export
	 */
	$scope.quadrant = {
		"slug": quadrant,
		"title": title
	};

	var newMarker = function(id, mod) {
		return {
			"id": id,
			"title": "New Item "+id,
			"deg": Math.round(Math.random() * 90 + mod),
			"mag": Math.round(Math.random() * 100),
			"new": Math.round(Math.random()) === 1,
		};
	};

	/**
	 * @type {demo.app.radar.Marker}
	 * @export
	 */
	$scope.marker = newMarker($stateParams.id, 0);

};


