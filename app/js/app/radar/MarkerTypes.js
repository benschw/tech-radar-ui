'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.radar.MarkerTypes');


/**
 * @constructor
 */
demo.app.radar.MarkerTypes = function(model) {
	this.model = model;
};

/**
 * @export
 */
demo.app.radar.MarkerTypes.prototype.getTypes = function() {
	var keys = [];
	for (var type in this.model) {
		keys.push(type);
	}
	return keys;
};

/**
 * @export
 */
demo.app.radar.MarkerTypes.prototype.getTypeTitle = function(type) {
	return this.model[type]['title'];
};
/**
 * @export
 */
demo.app.radar.MarkerTypes.prototype.getTypeDescription = function(type) {
	return this.model[type]['description'];
};
/**
 * @export
 */
demo.app.radar.MarkerTypes.prototype.getTypeRange = function(type) {
	return this.model[type]['range'];
};

/**
 * @export
 */
demo.app.radar.MarkerTypes.prototype.getTypeFromMagnitude = function(mag) {
	mag = mag / 100;
	var types = this.getTypes();

	for (var i = 0; i < types.length; i++) {
		var type = types[i];
		var range = this.getTypeRange(type);

		if (mag > range[0] && mag <= range[1]) {
			return type;
		}
	}
};

