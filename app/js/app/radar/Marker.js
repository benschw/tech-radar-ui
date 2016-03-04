'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.radar.Marker');


/**
 * @param {demo.app.radar.Graph} graph
 * @param {*} model
 * @constructor
 */
demo.app.radar.Marker = function(graph, model) {
	this.graph = graph;
	/**
	 * @export
	 */
	this.model = model;


	/**
	 * @export
	 */
	this.coord = null;
	this.setVector({'deg': model['deg'], 'mag': model['mag']});

	/**
	 * @export
	 */
	this.f = false;
	/**
	 * @export
	 */
	this.h = false;

	/**
	 * @export
	 */
	this.idx = "";
};

/**
 * @type {demo.app.radar.Graph}
 */
demo.app.radar.Marker.prototype.graph = null;

/**
 * @type {*}
 * @export
 */
demo.app.radar.Marker.prototype.model = {};

/**
 * @type {?demo.app.radar.Coordinates}
 * @export
 */
demo.app.radar.Marker.prototype.coord = null;

/**
 * @type {string}
 * @export
 */
demo.app.radar.Marker.prototype.idx = "";

/**
 * @param {boolean} enabled
 * @export
 */
demo.app.radar.Marker.prototype.select = function(enabled) {
	this.f = enabled;
};

/**
 * @param {boolean} enabled
 * @export
 */
demo.app.radar.Marker.prototype.hover = function(enabled) {
	this.h = enabled;
};

/**
 * @param {*} v
 * @export
 */
demo.app.radar.Marker.prototype.setVector = function(v) {
	this.model['mag'] = v['mag'];
	this.model['deg'] = v['deg'];

	this.model['type'] = this.graph.types.getTypeFromMagnitude(this.model['mag']);
	
	this.coord = this.graph.vectorToSvg(v);
};

