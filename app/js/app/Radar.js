'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.Radar');

goog.require('demo.app.Graph');
goog.require('demo.app.MarkerTypes');
goog.require('demo.app.Marker');
goog.require('demo.app.Coordinates');

/**
 * @constructor
 */
demo.app.Radar = function(config) {
	this.types = config.types;

	this.hideLabels = config.hideLabels ? true : false;

	this.markerRadius = config.markerRadius;
	this.markers = [];
	this.deletedMarkers = [];
	
	this.graph = new demo.app.Graph(config.radius, config.view, this.types);

	this.current = null;
	this.hover = null;
};

demo.app.Radar.prototype.newMarker = function(type) {
	var m = this.addMarker(new demo.app.Marker(this.graph,{
		"title": "New",
		"new": true,
	}));

	m.setVector(this.graph.getDefaultVector(type));
	
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
			c.x += dx;
			c.y += dy;
			
			var v = this.graph.svgToVector(c);
			this.markers[i].setVector(v)

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

demo.app.Radar.prototype.activateMarker = function(marker) {
	this.deactivateMarkers();
	marker.select(true);
	this.current = marker;
};
demo.app.Radar.prototype.deactivateMarkers = function() {
	for(var i=0; i<this.markers.length; i++) {
		this.markers[i].select(false);
	}
	this.current = null;
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
