'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.HomeCtrl');

goog.require('demo.app.Radar');
/**
 * Home controller
 * @param  {angular.Scope=} $scope
 * @constructor
 * @ngInject
 */
demo.app.HomeCtrl = function($scope) {
	/**
	 * @type {string}
	 * @export
	 */
	$scope.message = 'Hello Home';




	$scope.editable = true;
	$scope.graphs = [
		new demo.app.Radar({
			radius: 240,
			markerRadius: 8,
			view: "tl",
		}),
		new demo.app.Radar({
			radius: 240,
			markerRadius: 8,
			view: "tr",
		}),
		new demo.app.Radar({
			radius: 240,
			markerRadius: 8,
			view: "bl",
		}),
		new demo.app.Radar({
			radius: 240,
			markerRadius: 8,
			view: "br",
		}),
	];

	var i;
	for(i=0; i<5; i++) {
		$scope.graphs[0].addMarker(i, "tl item "+i, Math.random() * 90 + 90, Math.random() * 100);
	}
	for(i=0; i<5; i++) {
		$scope.graphs[1].addMarker(i, "tr item "+i, Math.random() * 90, Math.random() * 100);
	}
	for(i=0; i<5; i++) {
		$scope.graphs[2].addMarker(i, "tl item "+i, Math.random() * 90 + 180, Math.random() * 100);
	}
	for(i=0; i<5; i++) {
		$scope.graphs[3].addMarker(i, "tl item "+i, Math.random() * 90 + 270, Math.random() * 100);
	}
};
