'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.EditorCtrl');

/**
 * Home controller
 * @param {angular.Scope} $scope
 * @param {*} $uibModalInstance
 * @param {demo.app.radar.Radar} radar
 * @param {demo.app.radar.Marker} marker
 * @constructor
 * @ngInject
 */
demo.app.EditorCtrl = function($scope, $uibModalInstance, radar, marker) {
	
	$scope.marker = marker;

	$scope.ok = function () {
		$uibModalInstance.close(null);
	};
	$scope.delete = function () {
		radar.deleteMarker(marker);
		$uibModalInstance.close(null);
	};

};

