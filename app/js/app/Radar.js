'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.Radar');


/**
 * @constructor
 */
demo.app.Radar = function(config) {
	this.radius = config.radius;
	this.markerRadius = config.markerRadius;
	this.view = config.view;
	this.markers = [];

	this.style = {
		h: this.radius + 2,
		w: this.radius + 2,
		rings: this.getRings(),
		axes: this.getAxes()
	};

	this.current = null;
};

demo.app.Radar.prototype.addMarker = function(id, title, deg, mag) {
	this.markers.push({
		"id": id,
		"title": title,
		"coord": this.getCoordinates(deg, mag),
		f: false
	});
};

demo.app.Radar.prototype.selectItem = function(el) {
	for(var i=0; i<this.markers.length; i++) {

		if (el === null || this.markers[i].id !== el.id) {
			console.log(this.markers[i].title);
			this.markers[i].f = false;
		} else {
			if (this.markers[i].f) {
				this.markers[i].f = false;
				this.current = null;
				console.log("unselected");
			} else {
				this.markers[i].f = true;
				this.current = el;
				console.log("selected");
			}
		}
	}
};

demo.app.Radar.prototype.getCoordinates = function(deg, mag) {
	var rad = deg * (Math.PI / 180);
		
	var x = mag * Math.cos(rad);
	var y = mag * Math.sin(rad);
	console.log([x,y]);
	if (this.view === "tl") {
		return {
			"dx": Math.round((100 + x) / 100 * this.radius),
			"dy": Math.round((100 - y) / 100 * this.radius)
		};
	} else if (this.view === "tr") {
		return {
			"dx": Math.round(x / 100 * this.radius),
			"dy": Math.round((100 - y) / 100 * this.radius)
		};
	} else if (this.view === "bl") {
		return {
			"dx": Math.round((100 + x) / 100 * this.radius),
			"dy": Math.round(Math.abs(y) / 100 * this.radius)
		};
	} else if (this.view === "br") {
		return {
			"dx": Math.round(x / 100 * this.radius),
			"dy": Math.round(Math.abs(y) / 100 * this.radius)
		};
	}
};

demo.app.Radar.prototype.getAxes = function() {
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

demo.app.Radar.prototype.getRing = function(p) {
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

demo.app.Radar.prototype.getRings = function() {
	var rings = {arcs:[], fills:[]};
	
	var concatRings = function(rings, tmp) {
		rings.arcs = rings.arcs.concat(tmp.arcs);
		rings.fills = rings.fills.concat(tmp.fills);
		return rings;
	}


	rings = concatRings(rings, this.getRing(1));
	rings = concatRings(rings, this.getRing(0.85));
	rings = concatRings(rings, this.getRing(0.65));
	rings = concatRings(rings, this.getRing(0.40));
	return rings;
};

