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

	$scope.graph = {
		editable: true,
		radius: 300
	};

	$scope.editable = true;
	$scope.current = null;
	var radius = 10;

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
	
	$scope.elements = [];

	for(var i=0; i<20; i++) {
		$scope.elements.push(NewEl(i, "Item " + i, Math.random() * $scope.graph.radius * 2, Math.random() * $scope.graph.radius * 2));
	}
};
