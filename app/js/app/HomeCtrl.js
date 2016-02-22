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
	$scope.current = null;
	var radius = 12;

	var toggleFocus = function(el) {
		for(var i=0; i<$scope.elements.length; i++) {
			if ($scope.elements[i] !== el) {
				$scope.elements[i].f = false;
			} else {
				if ($scope.elements[i].f) {
					$scope.elements[i].f = false;
					$scope.current = null;
				} else {
					$scope.elements[i].f = true;
					$scope.current = el;
					console.log("selected");
				}
			}
		}
	};

	
	$scope.draw = function(e) {
		// skip adding if too close to existing circle
		for(var i=0; i<$scope.elements.length; i++) {
			var eln = $scope.elements[i];
			if ((Math.abs(eln.x - e.offsetX) <= radius) && (Math.abs(eln.y - e.offsetY) < radius)) {
				return;
			}
		}
		
		var el = {
			"x":    e.offsetX,
			"y":    e.offsetY,
			"r":    radius,
			"sw":   1,  // stroke width
			"f": false
		};
		$scope.elements.push(el);
		toggleFocus(el);
	};

	$scope.selectItem = function(el) {
		toggleFocus(el);
	};

	
	$scope.elements = [
	];



};
