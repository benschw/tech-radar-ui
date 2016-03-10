'use strict';
/**
 * @fileoverview Master bootstrap file.
 */

goog.provide('demo.app.radar.Graph');

goog.require('demo.app.radar.MarkerTypes');
goog.require('demo.app.radar.Coordinates');

/**
 * @param {number} radius
 * @param {string} view
 * @param {demo.app.radar.MarkerTypes} types
 * @constructor
 */
demo.app.radar.Graph = function(radius, view, types) {
	this.radius = radius;
	this.view = view;
	this.types = types;

	/**
	 * @export
	 */
	this.h = this.radius + 2;
	/**
	 * @export
	 */
	this.w = this.radius + 2;
	/**
	 * @export
	 */
	this.rings = {'arcs':[], 'fills':[]};
	/**
	 * @export
	 */
	this.axes = this.getAxes();
	
	/**
	 * @export
	 */
	this.labels = this.getLabels();
	/**
	 * @export
	 */
	this.legend = this.getLegend();


	var t = this.types.getTypes();
	for (var i = 0; i<t.length; i++) {
		var range = this.types.getTypeRange(t[i]);
		this.addRing(range[1]);
	}
};

/**
 * @type {number}
 * @export
 */
demo.app.radar.Graph.prototype.h = 0;
/**
 * @type {number}
 * @export
 */
demo.app.radar.Graph.prototype.w = 0;
/**
 * @type {*}
 * @export
 */
demo.app.radar.Graph.prototype.rings = {};
/**
 * @type {Array<*>}
 * @export
 */
demo.app.radar.Graph.prototype.axes = [];
/**
 * @type {Array<*>}
 * @export
 */
demo.app.radar.Graph.prototype.labels = [];
/**
 * @type {*}
 * @export
 */
demo.app.radar.Graph.prototype.legend = [];


/**
 * @param {*} v
 * @return {demo.app.radar.Coordinates}
 */
demo.app.radar.Graph.prototype.vectorToSvg = function(v) {
	return demo.app.radar.Coordinates.vectorToSvg(v, this.view, this.radius);
};

/**
 * @param {demo.app.radar.Coordinates} c
 * @return {*}
 */
demo.app.radar.Graph.prototype.svgToVector = function(c) {
	return demo.app.radar.Coordinates.svgToVector(c, this.view, this.radius);
};

/**
 * @param {string} type
 * @return {*}
 */
demo.app.radar.Graph.prototype.getDefaultVector = function(type) {
	var range = this.types.getTypeRange(type);
	var mag = (range[0] + ((range[1] - range[0]) / 2)) * 100;

	var deg = 45;
	if (this.view === "tl") {
		deg += 90;
	} else if (this.view === "tr") {
		//pass
	} else if (this.view === "bl") {
		deg += 180;
	} else if (this.view === "br") {
		deg += 270;
	}
	return {
		'mag': Math.round(mag),
		'deg': Math.round(deg)
	};
};

/**
 * @return {*}
 */
demo.app.radar.Graph.prototype.getLegend = function() {
	var x = 0;
	var y = 0;
	var anchor;
	var dx = 0;


	if (this.view === "tl") {
		x = 0;
		y = 0;
		dx = 15;
		anchor = "start";
	} else if (this.view === "tr") {
		x = this.radius - 20;
		y = 0;
		dx = -15;
		anchor = "end";
	} else if (this.view === "bl") {
		y = this.radius-45;
		x = 0;
		dx = 15;
		anchor = "start";
	} else if (this.view === "br") {
		y = this.radius-45;
		x = this.radius-20;
		dx = -15;
		anchor = "end";
	}
	return {
		'x': x,
		'y': y,
		'dx': dx,
		'anchor': anchor
	};
};

demo.app.radar.Graph.prototype.getLabels = function() {
	var labels = [];
	
	var r = this.radius;

	var t = this.types.getTypes();
	for (var i = 0; i<t.length; i++) {
		var type = t[i];
		var x = 0;
		var y = 0;
		var range = this.types.getTypeRange(type);
		var cx = (range[0] + ((range[1] - range[0]) / 2)) * r;
		if (this.view === "tl") {
			x = r - cx;
			y = r - 5;
		} else if (this.view === "tr") {
			x = cx;
			y = r - 5;
		} else if (this.view === "bl") {
			y = 15;
			x = r - cx;
		} else if (this.view === "br") {
			y = 15;
			x = cx;
		}
		labels.push({
			'title': this.types.getTypeTitle(type),
			'x': x,
			'y': y
		});
	}
	return labels;
};

demo.app.radar.Graph.prototype.getAxes = function() {
	var r = this.radius;
	if (this.view === "tl") {
		return [
			[0, r+1, r+2, r+1],
			[r+1, 0, r+1, r+2]
		];
	} else if (this.view === "tr") {
		return [
			[0, r+1, r+2, r+1],
			[1, 0, 1, r+2]
		];
	} else if (this.view === "bl") {
		return [
			[0, 1, r+2, 1],
			[r+1, 0, r+1, r+2]
		];
	} else if (this.view === "br") {
		return [
			[0, 1, r+2, 1],
			[1, 0, 1, r+2]
		];
	}
};

demo.app.radar.Graph.prototype.addRing = function(typeLimit) {
	var tmp = this.getRing(typeLimit);

	this.rings['arcs'] = this.rings['arcs'].concat(tmp['arcs']);
	this.rings['fills'] = this.rings['fills'].concat(tmp['fills']);
};

demo.app.radar.Graph.prototype.getRing = function(p) {
	var fmtArc = function(ring, inny) {
		return "M "+ring[0]+","+ring[1]+" A "+ring[4]+","+ring[4]+" 0 0,"+inny+" "+ring[2]+","+ring[3];
	};

	var fmtFill = function(ring, inny, x, y) {
		var base = fmtArc(ring, inny);
		return base + " L "+x+","+y+" Z";
	};

	var r = this.radius * p;
	var offset = this.radius - r;
	var c = [];
	if (this.view === "tl") {

		c = [offset+1, offset+r+2, offset+r+2, offset+1, r];
		return {
			"arcs": [fmtArc(c, 1)],
			"fills": [fmtFill(c, 1, this.radius+2, this.radius+2)]
		};
	} else if (this.view === "tr") {

		c = [0, offset+1, r+1, this.radius+2, r];
		return {
			"arcs": [fmtArc(c, 1)],
			"fills": [fmtFill(c, 1, 0, this.radius+2)]
		};
	} else if (this.view === "bl") {

		c = [offset+1, 0, this.radius+2, r+1, r];
		return {
			"arcs": [fmtArc(c, 0)],
			"fills": [fmtFill(c, 0, this.radius+2, 0)]
		};
	} else if (this.view === "br") {

		c = [0, r+1, r+1, 0, r];
		return {
			"arcs": [fmtArc(c, 0)],
			"fills": [fmtFill(c, 0, 0, 0)]
		};
	}
};


