'use strict';

goog.provide('demo.app.RadarServiceFactory');
goog.provide('demo.app.RadarService');


goog.require('demo.app.radar.Radar');
goog.require('demo.app.radar.DefaultMarkerTypes');

/**
 * @param {angular.$http} $http
 * @param {angular.$q} $q
 * @constructor
 * @ngInject
 */
demo.app.RadarServiceFactory = function($http, $q) {
	return new demo.app.RadarService($http, $q);
};

/**
 * @param {angular.$http} $http
 * @param {angular.$q} $q
 * @constructor
 * @ngInject
 */
demo.app.RadarService = function($http, $q) {
	this.http = $http;
	this.q = $q;
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
	return this.http.get(url)
		.then(function(response) {
			that.radars[view].markers = [];
			that.radars[view].deletedMarkers = [];
			for (var i = 0; i < response.data.length; i++) {
				that.radars[view].addMarker(
					new demo.app.radar.Marker(that.radars[view].graph, response.data[i])
				);
			}
			return that.radars[view];
		});
};

/**
 * @param {demo.app.radar.Radar} radar
 */
demo.app.RadarService.prototype.saveRadar = function(radar) {
	var that = this;
	var promises = [];

	angular.forEach(radar.markers, function(marker) {
		if (marker.model['id'] === null) {
			promises.push(that.addMarker(marker));
		} else {
			promises.push(that.saveMarker(marker));
		}
	});
	angular.forEach(radar.deletedMarkers, function(marker) {
		if (marker.model['id'] !== null) {
			promises.push(that.deleteMarker(marker, radar));
		}
	});

	return this.q.all(promises).then(function() {
		return that.refreshRadar(radar.graph.view);
		
	});
};

/**
 * @param {demo.app.radar.Marker} marker
 */
demo.app.RadarService.prototype.addMarker = function(marker) {
	var url = this.host + '/api/marker';

	return this.http.post(url, marker.model).then(function(response) {
		marker.model['id'] = response.data['id'];
	});
};

/**
 * @param {demo.app.radar.Marker} marker
 */
demo.app.RadarService.prototype.saveMarker = function(marker) {
	return this.saveModel(marker.model);
};

/**
 * @param {*} model
 */
demo.app.RadarService.prototype.saveModel = function(model) {
	var url = this.host + '/api/marker/' + model['id'];

	return this.http.put(url, model);
};

/**
 * @param {demo.app.radar.Marker} marker
 * @param {demo.app.radar.Radar} radar
 */
demo.app.RadarService.prototype.deleteMarker = function(marker, radar) {
	var url = this.host + '/api/marker/' + marker.model['id'];

	return this.http.delete(url).then(function() {
		var idx = radar.deletedMarkers.indexOf(marker);
		if (idx > -1) {
			radar.deletedMarkers.splice(idx, 1);
		}
	});
};
