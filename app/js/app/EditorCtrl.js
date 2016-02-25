'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.EditorCtrl');

/**
 * Home controller
 * @param  {angular.Scope=} $scope
 * @param {*=} $scope
 * @param {*=} $uibModalInstance
 * @param {*=} radar
 * @param {*=} marker
 * @constructor
 * @ngInject
 */
demo.app.EditorCtrl = function($scope, $state, $uibModalInstance, radar, marker) {
	
	$scope.marker = marker;

	$scope.ok = function () {
		$uibModalInstance.close(null);
	};
	$scope.delete = function () {
		radar.deleteMarker(marker);
		$uibModalInstance.close(null);
	};

};

