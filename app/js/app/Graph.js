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
	var px = 0;
	var py = 0;

	if (this.view === "tl") {
		px = (this.radius-x) * -1;
		py = this.radius - y;
	} else if (this.view === "tr") {
		px = x;
		py = this.radius - y;
	} else if (this.view === "bl") {
		px = (this.radius-x) * -1;
		py = y * -1;
	} else if (this.view === "br") {
		px = x;
		py = y * -1;
	}
	
	console.log([x,y,Math.round(px),Math.round(py)]);

	var rad = Math.atan2(py, px); // -PI..PI
	var deg = rad * 180 / Math.PI; // radians to degrees
	if (deg < 0) {
		deg = 360 + deg; // 0..360
	}
	
	var v = Math.sqrt(px*px + py*py); // get hypotenuse
	var mag = v / this.radius * 100;  // scale to 1-100 range

	return {
		"deg": Math.round(deg),
		"mag": Math.min(Math.round(mag), 100)
	};
};
demo.app.Graph.prototype.getCoordinates = function(deg, mag) {
	var rad = deg * (Math.PI / 180); // degrees to radians

	var magX = mag * Math.cos(rad);
	var magY = mag * Math.sin(rad);
	
	var x = Math.round(Math.abs(magX) / 100 * this.radius);
	var y = Math.round(Math.abs(magY) / 100 * this.radius);

	if (this.view === "tl") {
		return {
			"x": this.radius - x,
			"y": this.radius - y
		};
	} else if (this.view === "tr") {
		return {
			"x": x,
			"y": this.radius - y
		};
	} else if (this.view === "bl") {
		return {
			"x": this.radius - x,
			"y": y
		};
	} else if (this.view === "br") {
		return {
			"x": x,
			"y": y
		};
	}
};
demo.app.Graph.prototype.getDefaultPosition = function() {
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
	return deg;
};
