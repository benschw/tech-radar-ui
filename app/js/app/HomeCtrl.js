'use strict';
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
	/**
	 * @type {string}
	 * @export
	 */
	$scope.message = 'Hello Home';
	$scope.editable = true;
	$scope.current = null;
	var radius = 12;

	$scope.selectItem = function(el) {
		for(var i=0; i<$scope.elements.length; i++) {
			if (el === null || $scope.elements[i].id !== el.id) {
				console.log($scope.elements[i].title)
				$scope.elements[i].f = false;
			} else {
				if ($scope.elements[i].f) {
					$scope.elements[i].f = false;
					$scope.current = null;
					console.log("unselected");
				} else {
					$scope.elements[i].f = true;
					$scope.current = el;
					console.log("selected");
				}
			}
		}
	};

	var NewEl = function(id, title, x, y) {
		return {
			"id": id,
			"title": title,
			"x":  Math.round(x),
			"y":  Math.round(y),
			"r":  radius,
			"sw": 1,  // stroke width
			"f":  false
		};
	};
	
	var i = 0;
	$scope.elements = [
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300),
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300),
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300),
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300),
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300),
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300),
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300),
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300),
		NewEl(i, "Item " + i++, Math.random() * 500, Math.random() * 300)
	];
};
