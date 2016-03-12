'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.DetailsWidgetCtrl');

/**
 * @param {angular.Scope} $scope
 * @param {angular.Attributes} $attrs
 * @param {demo.app.ParamService} paramService
 * @param {demo.app.RadarService} radarService
 * @constructor
 * @ngInject
 */
demo.app.DetailsWidgetCtrl = function($scope, $attrs, paramService, radarService) {
	var id = paramService.parseParam('id');
	radarService.host = $attrs['host'];

	/**
	 * @type {boolean}
	 * @export
	 */
	$scope.editable = false;

	/**
	 * @type {*}
	 * @export
	 */
	$scope.marker = {};
	radarService.getModel(id).then(function(response) {
		$scope.model = response.data;
	});

	/**
	 * @type {function()}
	 * @export
	 */
	$scope.save = function() {
		radarService.saveModel($scope.model).then(function() {
			$scope.editable = false;
		});
	};
};


