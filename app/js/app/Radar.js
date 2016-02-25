'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.Radar');

goog.require('demo.app.Graph');

/**
 * @constructor
 */
demo.app.Radar = function(config) {

	this.markerRadius = config.markerRadius;
	this.markers = [];
	
	this.graph = new demo.app.Graph(config.radius, config.view);

	for (var type in this.typeRanges) {
		var range = this.typeRanges[type];
		this.graph.addRing(range[1]);
	}

	this.current = null;
	this.hover = null;

};
demo.app.Radar.prototype.typeRanges = {
	adopt:  [0,    0.4],
	trial:  [0.4,  0.65],
	assess: [0.65, 0.85],
	hold:   [0.85, 1]
};

demo.app.Radar.prototype.getTypes = function() {
	var keys = [];
	for (var type in this.typeRanges) {
		keys.push(type);
	}
	return keys;
};

demo.app.Radar.prototype.addMarker = function(model) {
	model.type = this.getTypeFromMagnitude(model.mag);
	this.markers.push({
		"model": model,
		"idx": this.markers.length,
		"coord": this.graph.getCoordinates(model.deg, model.mag),
		f: false,
		h: false
	});
};
demo.app.Radar.prototype.updateLocation = function(idx, dx, dy) {
	for(var i=0; i<this.markers.length; i++) {
		if (this.markers[i].idx == idx) {

			this.markers[i].coord.x += dx;
			this.markers[i].coord.y += dy;
			
			var tmp = this.graph.getPolar(this.markers[i].coord.x, this.markers[i].coord.y);
			this.markers[i].model.deg = tmp.deg;
			this.markers[i].model.mag = tmp.mag;
			this.markers[i].model.type = this.getTypeFromMagnitude(tmp.mag);
		}
	}
};

// private

demo.app.Radar.prototype.getTypeFromMagnitude = function(mag) {
	mag = mag / 100;
	var types = this.getTypes();
	for (var i = 0; i < types.length; i++) {
		var range = this.typeRanges[types[i]];
		if (mag > range[0] && mag <= range[1]) {
			return types[i];
		}
	}
};

demo.app.Radar.prototype.enterHover = function(marker) {
	for(var i=0; i<this.markers.length; i++) {
		if (this.markers[i].idx === marker.idx) {
			this.markers[i].h = true;
		}
	}
	this.hover = marker;
};
demo.app.Radar.prototype.exitHover = function(marker) {
	for(var i=0; i<this.markers.length; i++) {
		if (this.markers[i].idx === marker.idx) {
			this.markers[i].h = false;
		}
	}
	this.hover = null;
};
demo.app.Radar.prototype.toggleMarker = function(el) {
	for(var i=0; i<this.markers.length; i++) {

		if (el === null || this.markers[i].idx !== el.idx) {
			this.markers[i].f = false;
		} else {
			if (this.markers[i].f) {
				this.markers[i].f = false;
				this.current = null;
			} else {
				this.markers[i].f = true;
				this.current = el;
			}
		}
	}
};

