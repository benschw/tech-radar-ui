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

	model.type = this.graph.types.getTypeFromMagnitude(model.mag);
	this.coord = this.graph.getCoordinates(model.deg, model.mag);
	this.f = false;
	this.h = false;


};

demo.app.Marker.prototype.idx = "";

demo.app.Marker.prototype.select = function(enabled) {
	this.f = enabled;
};
demo.app.Marker.prototype.hover = function(enabled) {
	this.h = enabled;
};

