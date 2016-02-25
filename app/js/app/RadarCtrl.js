'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.RadarCtrl');

goog.require('demo.app.Radar');
/**
 * Home controller
 * @param  {angular.Scope=} $scope
 * @param {*=} $scope
 * @param {*=} $uibModal
 * @constructor
 * @ngInject
 */
demo.app.RadarCtrl = function($scope, $state, $uibModal) {
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

	$scope.openEditor = function(marker) {

		var modalInstance = $uibModal.open({
			animation: true,
			templateUrl: 'app/tpl/editor.html',
			controller: 'demo.app.EditorCtrl',
			size: 'lg',
			resolve: {
				radar: function() {
					return $scope.radar;
				},
				marker: function() {
					return marker;
				}
			}
		});

		modalInstance.result.then(function(ret) {
			// returned
		});
	};

	$scope.saveAll = function() {
		console.log("saving...");
	};

	if (view == "tl") {
		for(var i=0; i<50; i++) {
			$scope.radar.addMarker({
				"id": i,
				"title": "tl item "+i,
				"deg": Math.round(Math.random() * 90 + 90),
				"mag": Math.round(Math.random() * 100),
				"new": Math.round(Math.random()) === 1,
			});
		}
	}
	if (view == "tr") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker({
				"id": i,
				"title": "tl item "+i,
				"deg": Math.round(Math.random() * 90),
				"mag": Math.round(Math.random() * 100),
				"new": Math.round(Math.random()) === 1,
			});
		}
	}
	if (view == "bl") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker({
				"id": i,
				"title": "tl item "+i,
				"deg": Math.round(Math.random() * 90 + 180),
				"mag": Math.round(Math.random() * 100),
				"new": Math.round(Math.random()) === 1,
			});
		}
	}
	if (view == "br") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker({
				"id": i,
				"title": "tl item "+i,
				"deg": Math.round(Math.random() * 90 + 270),
				"mag": Math.round(Math.random() * 100),
				"new": Math.round(Math.random()) === 1,
			});
		}
	}
};

