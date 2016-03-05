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
	console.log([this.radars, view]);

	return this.radars[view];
};

/**
 * @param {string} view
 */
demo.app.RadarService.prototype.refreshRadar = function(view) {
	//
	// FIXTURE DATA
	//
	var newMarker = function(graph, i, mod) {
		return new demo.app.radar.Marker(graph, {
			"id": i+1,
			"title": "New Item "+(i+1),
			"deg": Math.round(Math.random() * 90 + mod),
			"mag": Math.round(Math.random() * 100),
			"new": Math.round(Math.random()) === 1,
		});
	};

	var i;
	if (view === "tl") {
		for(i=0; i<40; i++) {
			this.radars[view].addMarker(newMarker(this.radars[view].graph, i, 90));
		}
	}
	if (view === "tr") {
		for(i=0; i<5; i++) {
			this.radars[view].addMarker(newMarker(this.radars[view].graph, i, 0));
		}
	}
	if (view === "bl") {
		for(i=0; i<5; i++) {
			this.radars[view].addMarker(newMarker(this.radars[view].graph, i, 180));
		}
	}
	if (view === "br") {
		for(i=0; i<5; i++) {
			this.radars[view].addMarker(newMarker(this.radars[view].graph, i, 270));
		}
	}

};
