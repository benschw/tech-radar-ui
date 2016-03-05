'use strict';
/**
 * @fileoverview Controller for Home page
 */
goog.provide('demo.app.DetailsWidgetCtrl');

/**
 * @param {angular.Scope} $scope
 * @constructor
 * @ngInject
 */
demo.app.DetailsWidgetCtrl = function($scope) {
	var parse = function(val) {
		var result = "Not found",
		tmp = [];
		location.search
			.substr(1) // skip "?"
			.split("&")
			.forEach(function (item) {
				tmp = item.split("=");
				if (tmp[0] === val) {
					result = decodeURIComponent(tmp[1]);
				}
			});
		return result;
	};

	var id = parse('id');
//	var id = $stateParamas.id;
//	var view  = demo.app.radar.Quadrants.lookupSlug($stateParams.quadrant);
//	var title = demo.app.radar.Quadrants.getTitle(view);

	/**
	 * @type {*}
	 * @export
	 */
	$scope.quadrant = {
		"slug": "foo",//quadrant,
		"title": "Foo"//title
	};


	//
	// FIXTURE DATA
	//

	var newMarker = function(id, mod) {
		return {
			"id": id,
			"title": "New Item "+id,
			"deg": Math.round(Math.random() * 90 + mod),
			"mag": Math.round(Math.random() * 100),
			"new": Math.round(Math.random()) === 1,
		};
	};

	/**
	 * @type {demo.app.radar.Marker}
	 * @export
	 */
	$scope.marker = newMarker(id, 0);

};


