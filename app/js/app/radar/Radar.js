'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.radar.Radar');

goog.require('demo.app.radar.Graph');
goog.require('demo.app.radar.MarkerTypes');
goog.require('demo.app.radar.Marker');
goog.require('demo.app.radar.Coordinates');

/**
 * @param {*} config
 * @constructor
 */
demo.app.radar.Radar = function(config) {
	/**
	 * @export
	 */
	this.types = config.types;

	/**
	 * @export
	 */
	this.hideLabels = config.hideLabels ? true : false;

	/**
	 * @export
	 */
	this.markerRadius = config.markerRadius;
	/**
	 * @export
	 */
	this.markers = [];
	this.deletedMarkers = [];
	
	/**
	 * @export
	 */
	this.graph = new demo.app.radar.Graph(config.radius, config.view, this.types);

	/**
	 * @export
	 */
	this.current = null;
	/**
	 * @export
	 */
	this.hover = null;
};

/**
 * @type {demo.app.radar.MarkerTypes}
 * @export
 */
demo.app.radar.Radar.prototype.types = null;
/**
 * @type {boolean}
 * @export
 */
demo.app.radar.Radar.prototype.hideLabels = false;
/**
 * @type {number}
 * @export
 */
demo.app.radar.Radar.prototype.markerRadius = 0;
/**
 * @type {Array<demo.app.radar.Marker>}
 * @export
 */
demo.app.radar.Radar.prototype.markers = [];
/**
 * @type {Array<demo.app.radar.Marker>}
 * @export
 */
demo.app.radar.Radar.prototype.deletedMarkers = [];
/**
 * @type {?demo.app.radar.Graph}
 * @export
 */
demo.app.radar.Radar.prototype.graph = null;
/**
 * @type {?demo.app.radar.Marker}
 * @export
 */
demo.app.radar.Radar.prototype.current = null;
/**
 * @type {?demo.app.radar.Marker}
 * @export
 */
demo.app.radar.Radar.prototype.hover = null;



/**
 * @param {string} type
 * @return {demo.app.radar.Marker}
 * @export
 */
demo.app.radar.Radar.prototype.newMarker = function(type) {
	var m = this.addMarker(new demo.app.radar.Marker(this.graph,{
		"title": "New",
		"new": true,
	}));

	m.setVector(this.graph.getDefaultVector(type));
	
	this.activateMarker(m);
	return this.current;
};
/**
 * @param {demo.app.radar.Marker} marker
 * @export
 */
demo.app.radar.Radar.prototype.deleteMarker = function(marker) {
	var idx = this.markers.indexOf(marker);
	if (idx > -1) {
		this.markers.splice(idx, 1);
	}
	this.reindex();
	this.deletedMarkers.push(marker);
};
/**
 * @param {demo.app.radar.Marker} marker
 * @return {demo.app.radar.Marker}
 * @export
 */
demo.app.radar.Radar.prototype.addMarker = function(marker) {
	this.markers.push(marker);
	this.reindex();
	return marker;
};
/**
 * @param {string} idx
 * @param {number} dx
 * @param {number} dy
 * @export
 */
demo.app.radar.Radar.prototype.updateLocation = function(idx, dx, dy) {
	for(var i=0; i<this.markers.length; i++) {
		if (this.markers[i].idx === idx) {
			var c = this.markers[i].coord;
			c.x += dx;
			c.y += dy;
			
			var v = this.graph.svgToVector(c);
			this.markers[i].setVector(v);

			this.reindex();
			return;
		}
	}
};

/**
 * @param {demo.app.radar.Marker} marker
 * @export
 */
demo.app.radar.Radar.prototype.enterHover = function(marker) {
	marker.hover(true);
	this.hover = marker;
};
/**
 * @param {demo.app.radar.Marker} marker
 * @export
 */
demo.app.radar.Radar.prototype.exitHover = function(marker) {
	marker.hover(false);
	this.hover = null;
};

/**
 * @param {demo.app.radar.Marker} marker
 * @export
 */
demo.app.radar.Radar.prototype.activateMarker = function(marker) {
	this.deactivateMarkers();
	marker.select(true);
	this.current = marker;
};
/**
 * @export
 */
demo.app.radar.Radar.prototype.deactivateMarkers = function() {
	for(var i=0; i<this.markers.length; i++) {
		this.markers[i].select(false);
	}
	this.current = null;
};

/**
 * @private
 */
demo.app.radar.Radar.prototype.reindex = function() {
	this.markers.sort(function(a, b) {
		if (a.model['mag'] < b.model['mag']) {
			return -1;
		} else if (a.model['mag'] > b.model['mag']) {
			return 1;
		} else {
			return 0;
		}
	});

	for (var i=0; i<this.markers.length; i++) {
		this.markers[i].idx = i+1 + "";
	}
};
