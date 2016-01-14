'use strict';
/**
 * @fileoverview Controller for Messages page
 */
goog.provide('demo.app.MessagesCtrl');


/**
 * Messages controller
 * @param  {angular.Scope=} $scope
 * @constructor
 * @ngInject
 */
demo.app.MessagesCtrl = function($scope) {
	console.log('ctrl');
	/**
	 * @type {string}
	 * @export
	 */
	$scope.message = 'Hello Messages';
};

