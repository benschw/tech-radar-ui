'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.Coordinates');


/**
 * @param{int} x
 * @param{int} y
 * @constructor
 */
demo.app.Coordinates = function(x, y) {
	this.x = x;
	this.y = y;
};


demo.app.Coordinates.polarToSvg = function(polar, view, radius) {
	var x = Math.round(Math.abs(polar.x) / 100 * radius);
	var y = Math.round(Math.abs(polar.y) / 100 * radius);
	
	var sx = 0;
	var sy = 0;

	if (view === "tl") {
		sx = radius - x;
		sy = radius - y;
	} else if (view === "tr") {
		sx = x;
		sy = radius - y;
	} else if (view === "bl") {
		sx = radius - x;
		sy = y;
	} else if (view === "br") {
		sx = x;
		sy = y;
	}
	return new demo.app.Coordinates(sx, sy);
};
demo.app.Coordinates.svgToPolar = function(coord, view, radius) {
	var x = coord.x;
	var y = coord.y;
	var px = 0;
	var py = 0;

	if (view === "tl") {
		px = (radius-x) * -1;
		py = radius - y;
	} else if (view === "tr") {
		px = x;
		py = radius - y;
	} else if (view === "bl") {
		px = (radius-x) * -1;
		py = y * -1;
	} else if (view === "br") {
		px = x;
		py = y * -1;
	}
	return new demo.app.Coordinates(px, py);
};
demo.app.Coordinates.polarToVector = function(coord, radius) {
	var px = coord.x;
	var py = coord.y;

	var rad = Math.atan2(py, px); // -PI..PI
	var deg = rad * 180 / Math.PI; // radians to degrees
	if (deg < 0) {
		deg = 360 + deg; // 0..360
	}
	
	var v = Math.sqrt(px*px + py*py); // get hypotenuse
	var mag = v / radius * 100;  // scale to 1-100 range

	return {
		"deg": Math.round(deg),
		"mag": Math.min(Math.round(mag), 100)
	};
};
demo.app.Coordinates.vectorToPolar = function(v) {
	var rad = v.deg * (Math.PI / 180); // degrees to radians

	var magX = v.mag * Math.cos(rad);
	var magY = v.mag * Math.sin(rad);

	return new demo.app.Coordinates(magX, magY);
};

demo.app.Coordinates.vectorToSvg = function(v, view, radius) {
	var polarCoord = demo.app.Coordinates.vectorToPolar(v);
	return demo.app.Coordinates.polarToSvg(polarCoord, view, radius);
};
demo.app.Coordinates.svgToVector = function(c, view, radius) {
	var polarCoord = demo.app.Coordinates.svgToPolar({x: c.x, y: c.y}, view, radius);
	return demo.app.Coordinates.polarToVector(polarCoord, radius);
};
