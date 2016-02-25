'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.RadarCtrl');

goog.require('demo.app.Radar');
/**
 * Home controller
 * @param  {angular.Scope=} $scope
 * @constructor
 * @ngInject
 */
demo.app.RadarCtrl = function($scope, $state) {
	var view = $state.current.data.view
	/**
	 * @type {string}
	 * @export
	 */
	$scope.message = view


	$scope.editable = true;
	$scope.radar = new demo.app.Radar({
		radius: 350,
		markerRadius: 8,
		view: view
	});

	if (view == "tl") {
		for(var i=0; i<50; i++) {
			$scope.radar.addMarker({
				"id": i,
				"title": "tl item "+i,
				"deg": Math.random() * 90 + 90,
				"mag": Math.random() * 100
			});
		}
	}
	if (view == "tr") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker({
				"id": i,
				"title": "tl item "+i,
				"deg": Math.random() * 90,
				"mag": Math.random() * 100
			});
		}
	}
	if (view == "bl") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker({
				"id": i,
				"title": "tl item "+i,
				"deg": Math.random() * 90 + 180,
				"mag": Math.random() * 100
			});
		}
	}
	if (view == "br") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker({
				"id": i,
				"title": "tl item "+i,
				"deg": Math.random() * 90 + 270,
				"mag": Math.random() * 100
			});
		}
	}
};

