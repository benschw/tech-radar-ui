'use strict';

goog.provide('demo.app.RadarServiceFactory');
goog.provide('demo.app.RadarService');


goog.require('demo.app.radar.Radar');
goog.require('demo.app.radar.DefaultMarkerTypes');

/**
 * @param {angular.$http} $http
 * @constructor
 * @ngInject
 */
demo.app.RadarServiceFactory = function($http) {
	return new demo.app.RadarService($http);
};

/**
 * @param {angular.$http} $http
 * @constructor
 * @ngInject
 */
demo.app.RadarService = function($http) {
	this.http = $http;
};

/**
 * @type {string}
 */
demo.app.RadarService.prototype.host = '';

/**
 * @type {Object<string, demo.app.radar.Radar>}}
 */
demo.app.RadarService.prototype.radars = {};

/**
 * @param {string} view
 */
demo.app.RadarService.prototype.getRadar = function(view) {
	if (!(view in this.radars)) {
		this.radars[view] = new demo.app.radar.Radar({
			radius: 350,
			markerRadius: 10,
			view: view,
			types: demo.app.radar.DefaultMarkerTypes()
		});
		this.refreshRadar(view);
	}

	return this.radars[view];
};

/**
 * @param {string} id
 */
demo.app.RadarService.prototype.getModel = function(id) {
	var url = this.host + '/api/marker/' + id;
	
	return this.http.get(url);
};

/**
 * @param {string} view
 */
demo.app.RadarService.prototype.refreshRadar = function(view) {
	var url = this.host + '/api/marker?view=' + view;

	var that = this;
	this.http.get(url)
		.success(function(data) {
			for (var i = 0; i < data.length; i++) {
				that.radars[view].addMarker(
					new demo.app.radar.Marker(that.radars[view].graph, data[i])
				);
			}
		});
};

/**
 * @param {demo.app.radar.Radar} radar
 */
demo.app.RadarService.prototype.saveRadar = function(radar) {
	for (var i = 0; i < radar.markers.length; i++) {
		console.log(radar.markers[i].model);
		if (radar.markers[i].model['id'] === null) {
			this.addMarker(radar.markers[i]);
		} else {
			this.saveMarker(radar.markers[i]);
		}
	}
	for (i = 0; i < radar.deletedMarkers.length; i++) {
		if (radar.deletedMarkers[i].model['id'] !== null) {
			this.deleteMarker(radar.deletedMarkers[i]);
		}
	}
};

/**
 * @param {demo.app.radar.Marker} marker
 */
demo.app.RadarService.prototype.saveMarker = function(marker) {
	this.saveModel(marker.model);
};

/**
 * @param {*} model
 */
demo.app.RadarService.prototype.saveModel = function(model) {
	var url = this.host + '/api/marker/' + model['id'];

	this.http.put(url, model);
};

/**
 * @param {demo.app.radar.Marker} marker
 */
demo.app.RadarService.prototype.addMarker = function(marker) {
	var url = this.host + '/api/marker';

	this.http.post(url, marker.model);
};

/**
 * @param {demo.app.radar.Marker} marker
 */
demo.app.RadarService.prototype.deleteMarker = function(marker) {
	var url = this.host + '/api/marker/' + marker.model['id'];

	this.http.delete(url);
};
