'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.RadarCtrl');

goog.require('demo.app.Radar');
goog.require('demo.app.Marker')
goog.require('demo.app.Quadrants')
goog.require('demo.app.DefaultMarkerTypes')
/**
 * Home controller
 * @param  {angular.Scope=} $scope
 * @param {*=} $scope
 * @param {*=} $uibModal
 * @constructor
 * @ngInject
 */
demo.app.RadarCtrl = function($scope, $state, $uibModal, $stateParams) {
	var view  = demo.app.Quadrants.lookupSlug($stateParams.quadrant);
	var title = demo.app.Quadrants.getTitle(view);

	$scope.quadrant = $stateParams.quadrant;
	$scope.title = title;
	$scope.editable = true;
	$scope.radar = new demo.app.Radar({
		radius: 350,
		markerRadius: 10,
		view: view,
		types: demo.app.DefaultMarkerTypes()
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
	};

	$scope.saveAll = function() {
		console.log("saving...");
	};

	var newMarker = function(i, mod) {
		return new demo.app.Marker($scope.radar.graph, {
			"id": i+1,
			"title": "New Item "+(i+1),
			"deg": Math.round(Math.random() * 90 + mod),
			"mag": Math.round(Math.random() * 100),
			"new": Math.round(Math.random()) === 1,
		});
	};

	if (view == "tl") {
		for(var i=0; i<40; i++) {
			$scope.radar.addMarker(newMarker(i, 90));
		}
	}
	if (view == "tr") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker(newMarker(i, 0));
		}
	}
	if (view == "bl") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker(newMarker(i, 180));
		}
	}
	if (view == "br") {
		for(var i=0; i<5; i++) {
			$scope.radar.addMarker(newMarker(i, 270));
		}
	}

};

