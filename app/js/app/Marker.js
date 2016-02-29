'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.Marker');


/**
 * @constructor
 */
demo.app.Marker = function(graph, model) {
	this.graph = graph;
	this.model = model;


	this.setVector({deg: model.deg, mag: model.mag})

	this.f = false;
	this.h = false;
};

demo.app.Marker.prototype.coord = {};

demo.app.Marker.prototype.idx = "";

demo.app.Marker.prototype.select = function(enabled) {
	this.f = enabled;
};
demo.app.Marker.prototype.hover = function(enabled) {
	this.h = enabled;
};

demo.app.Marker.prototype.setVector = function(v) {
	this.model.mag = v.mag;
	this.model.deg = v.deg;

	this.model.type = this.graph.types.getTypeFromMagnitude(this.model.mag);

	this.coord = this.graph.vectorToSvg(v);
};

