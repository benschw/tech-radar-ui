'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.Radar');

goog.require('demo.app.Graph');
goog.require('demo.app.MarkerTypes');
goog.require('demo.app.Marker');

/**
 * @constructor
 */
demo.app.Radar = function(config) {

	this.types = new demo.app.MarkerTypes({
		adopt: {
			title: "Adopt",
			range: [0, 0.4]
		},
		trial: {
			title: "Trial",
			range: [0.4, 0.65]
		},
		assess: {
			title: "Assess",
			range: [0.65, 0.85]
		},
		hold: {
			title: "Hold",
			range: [0.85, 1]
		}
	});

	this.hideLabels = config.hideLabels ? true : false;

	this.markerRadius = config.markerRadius;
	this.markers = [];
	this.deletedMarkers = [];
	
	this.graph = new demo.app.Graph(config.radius, config.view, this.types);

	this.current = null;
	this.hover = null;
};

demo.app.Radar.prototype.newMarker = function(type) {
	var range = this.types.getTypeRange(type);
	var mag = (range[0] + ((range[1] - range[0]) / 2)) * 100;

	var m = this.addMarker(new demo.app.Marker(this.graph,{
		"title": "New",
		"deg": this.graph.getDefaultPosition(),
		"mag": mag,
		"new": true,
	}));

	this.activateMarker(m);
	return this.current;
};
demo.app.Radar.prototype.deleteMarker = function(marker) {
	var idx = this.markers.indexOf(marker);
	if (idx > -1) {
		this.markers.splice(idx, 1);
	}
	this.reindex();
	this.deletedMarkers.push(marker);
};
demo.app.Radar.prototype.addMarker = function(marker) {
	this.markers.push(marker);
	marker.idx = this.markers.length;
	this.reindex();
	return marker;
};
demo.app.Radar.prototype.updateLocation = function(idx, dx, dy) {
	for(var i=0; i<this.markers.length; i++) {
		if (this.markers[i].idx == idx) {
			var c = this.markers[i].coord;
			var r = this.graph.radius;
			c.x += dx;
			c.y += dy;
			
			c.x = Math.max(c.x, 0);
			c.x = Math.min(c.x, r);
			c.y = Math.max(c.y, 0);
			c.y = Math.min(c.y, r);

			var polar = this.graph.getPolar(c.x, c.y);

			this.markers[i].model.deg = polar.deg;
			this.markers[i].model.mag = polar.mag;
			this.markers[i].model.coord = this.graph.getCoordinates(polar.deg, polar.mag);
			this.markers[i].model.type = this.types.getTypeFromMagnitude(polar.mag);

			this.reindex();
			return;
		}
	}
};

demo.app.Radar.prototype.enterHover = function(marker) {
	marker.hover(true);
	this.hover = marker;
};
demo.app.Radar.prototype.exitHover = function(marker) {
	marker.hover(false);
	this.hover = null;
};
demo.app.Radar.prototype.deactivateMarkers = function() {
	for(var i=0; i<this.markers.length; i++) {
		this.markers[i].select(false);
	}
	this.current = null;
};
demo.app.Radar.prototype.activateMarker = function(marker) {
	this.deactivateMarkers();
	marker.select(true);
	this.current = marker;
};

// private

demo.app.Radar.prototype.reindex = function() {
	this.markers.sort(function(a, b) {
		if (a.model.mag < b.model.mag) {
			return -1;
		} else if (a.model.mag > b.model.mag) {
			return 1;
		} else {
			return 0;
		}
	});

	for (var i=0; i<this.markers.length; i++) {
		this.markers[i].idx = i+1;
	}
};
