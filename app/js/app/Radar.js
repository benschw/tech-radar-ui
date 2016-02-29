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
			description: "The Adopt Ring represents blips that we think you should be using now. We don't say that you should use these for every project; any tool should only be used in an appropriate context. However we do think that a blip in the adopt ring represents something where there is no doubt that it's proven and mature for use.",
			range: [0, 0.4]
		},
		trial: {
			title: "Trial",
			description: "The Trial Ring is for blips that we think are ready for use, but not as completely proven as those in the adopt ring. So for most organizations we think you should use these on a trial basis, to decide whether they should be part of your toolkit. Typically we are happy to use trial blips now, but we realize that most readers will be more cautious than us.",
			range: [0.4, 0.65]
		},
		assess: {
			title: "Assess",
			description: "The Assess Ring are things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you. Typically blips in the assess ring are things that we are currently trialling, on our projects.",
			range: [0.65, 0.85]
		},
		hold: {
			title: "Hold",
			description: "The Hold Ring is for things that are getting attention in the industry, but we don't think are ready for use. Sometimes this is because we don't think they are mature enough yet, sometimes it means we think they are irredeemably flawed. We don't have an \"avoid\" ring, but we do throw things in the hold ring that we wish our clients wouldn't use.",

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
