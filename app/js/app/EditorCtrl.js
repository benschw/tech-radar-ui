'use strict';

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
	
	/**
	 * @type {demo.app.radar.Marker}
	 * @export
	 */
	$scope.marker = marker;

	/**
	 * @type {function()}
	 * @export
	 */
	$scope.ok = function() {
		$uibModalInstance.close(null);
	};

	/**
	 * @type {function()}
	 * @export
	 */
	$scope.delete = function() {
		radar.deleteMarker(marker);
		$uibModalInstance.close(null);
	};

};

