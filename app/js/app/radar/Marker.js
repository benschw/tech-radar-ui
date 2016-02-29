'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.radar.Marker');


/**
 * @constructor
 */
demo.app.radar.Marker = function(graph, model) {
	this.graph = graph;
	this.model = model;


	this.setVector({deg: model.deg, mag: model.mag})

	this.f = false;
	this.h = false;
};

demo.app.radar.Marker.prototype.coord = {};

demo.app.radar.Marker.prototype.idx = "";

demo.app.radar.Marker.prototype.select = function(enabled) {
	this.f = enabled;
};
demo.app.radar.Marker.prototype.hover = function(enabled) {
	this.h = enabled;
};

demo.app.radar.Marker.prototype.setVector = function(v) {
	this.model.mag = v.mag;
	this.model.deg = v.deg;

	this.model.type = this.graph.types.getTypeFromMagnitude(this.model.mag);

	this.coord = this.graph.vectorToSvg(v);
};

