/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.HomeCtrl');


/**
 * Home controller
 * @param  {angular.Scope=} $scope
 * @constructor
 * @ngInject
 */
demo.app.HomeCtrl = function($scope) {
	console.log('ctrl');
	/**
	 * @type {string}
	 * @export
	 */
	$scope.message = 'Hello Home';
};

