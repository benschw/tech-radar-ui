'use strict';
/**
 * @fileoverview Master bootstrap file.
 */

goog.provide('demo.app.Graph');

/**
 * @constructor
 */
demo.app.Graph = function(radius, view) {
	this.radius = radius;
	this.view = view;

	this.h = this.radius + 2;
	this.w = this.radius + 2
	this.rings = {arcs:[], fills:[]};
	this.axes = this.getAxes();
};

demo.app.Graph.prototype.addRing = function(typeLimit) {
	var tmp = this.getRing(typeLimit);

	this.rings.arcs = this.rings.arcs.concat(tmp.arcs);
	this.rings.fills = this.rings.fills.concat(tmp.fills);
};

demo.app.Graph.prototype.getAxes = function() {
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

demo.app.Graph.prototype.getRing = function(p) {
	var fmtArc = function(ring, inny) {
		return "M "+ring[0]+","+ring[1]+" A "+ring[4]+","+ring[4]+" 0 0,"+inny+" "+ring[2]+","+ring[3]
	};

	var fmtFill = function(ring, inny, x, y) {
		var base = fmtArc(ring, inny);
		return base + " L "+x+","+y+" Z";
	};

	var r = this.radius * p;
	var d = r * 2;
	var offset = this.radius - r;
	if (this.view === "tl") {

		var c = [offset+1, offset+r+2, offset+r+2, offset+1, r];
		return {
			"arcs": [fmtArc(c, 1)],
			"fills": [fmtFill(c, 1, this.radius+2, this.radius+2)]
		};
	} else if (this.view === "tr") {

		var c = [0, offset+1, r+1, this.radius+2, r];
		return {
			"arcs": [fmtArc(c, 1)],
			"fills": [fmtFill(c, 1, 0, this.radius+2)]
		};
	} else if (this.view === "bl") {

		var c = [offset+1, 0, this.radius+2, r+1, r];
		return {
			"arcs": [fmtArc(c, 0)],
			"fills": [fmtFill(c, 0, this.radius+2, 0)]
		};
	} else if (this.view === "br") {

		var c = [0, r+1, r+1, 0, r];
		return {
			"arcs": [fmtArc(c, 0)],
			"fills": [fmtFill(c, 0, 0, 0)]
		};
	}
};

demo.app.Graph.prototype.getPolar = function(x, y) {
	if (this.view === "tl") {
		return {
			"deg": null,
			"mag": null
		};
	} else if (this.view === "tr") {
		return {
			"deg": null,
			"mag": null
		};
	} else if (this.view === "bl") {
		return {
			"deg": null,
			"mag": null
		};
	} else if (this.view === "br") {
		return {
			"deg": null,
			"mag": null
		};
	}

};
demo.app.Graph.prototype.getCoordinates = function(deg, mag) {
	var rad = deg * (Math.PI / 180);
		
	var x = Math.abs(mag * Math.cos(rad)) / 100 * this.radius;
	var y = Math.abs(mag * Math.sin(rad)) / 100 * this.radius;
	if (this.view === "tl") {
		return {
			"x": Math.round(this.radius - x),
			"y": Math.round(this.radius - y)
		};
	} else if (this.view === "tr") {
		return {
			"x": Math.round(x),
			"y": Math.round(this.radius - y)
		};
	} else if (this.view === "bl") {
		return {
			"x": Math.round(this.radius - x),
			"y": Math.round(y)
		};
	} else if (this.view === "br") {
		return {
			"x": Math.round(x),
			"y": Math.round(y)
		};
	}
};

