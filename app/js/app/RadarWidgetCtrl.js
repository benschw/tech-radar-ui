'use strict';

goog.provide('demo.app.RadarWidgetCtrl');

goog.require('demo.app.radar.Radar');
goog.require('demo.app.radar.Marker');
goog.require('demo.app.radar.Quadrants');
goog.require('demo.app.radar.DefaultMarkerTypes');
goog.require('demo.app.RadarService');


/**
 * @param {angular.Scope} $scope
 * @param {angular.Attributes} $attrs
 * @param {demo.app.RadarService} radarService
 * @param {*} $uibModal
 * @constructor
 * @ngInject
 */
demo.app.RadarWidgetCtrl = function($scope, $attrs, radarService, $uibModal) {
	var view  = demo.app.radar.Quadrants.lookupSlug($attrs['quadrant']);
	radarService.host = $attrs['host'];
	
	/**
	 * @type {string}
	 * @export
	 */
	$scope.detailsHref = $attrs['detailsHref'];

	/**
	 * @type {boolean}
	 * @export
	 */
	$scope.editable = false;
	
	/**
	 * @type {demo.app.radar.Radar}
	 * @export
	 */
	$scope.radar = radarService.getRadar(view);

	/**
	 * @type {function(demo.app.radar.Marker)}
	 * @export
	 */
	$scope.openEditor = function(marker) {
		$uibModal.open({
			animation: true,
			templateUrl: 'app/tpl/editor.html',
			controller: demo.app.EditorCtrl.name,
			size: 'lg',
			resolve: {
				'radar': function() {
					return $scope.radar;
				},
				'marker': function() {
					return marker;
				}
			}
		});
	};

	/**
	 * @type {function()}
	 * @export
	 */
	$scope.save = function() {
		radarService.saveRadar($scope.radar).then(function() {
			$scope.editable = false;
		});
	};

};


