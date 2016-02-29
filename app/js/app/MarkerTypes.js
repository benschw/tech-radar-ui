'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.MarkerTypes');


/**
 * @constructor
 */
demo.app.MarkerTypes = function(model) {
	this.model = model;
};

demo.app.MarkerTypes.prototype.getTypes = function() {
	var keys = [];
	for (var type in this.model) {
		keys.push(type);
	}
	return keys;
};

demo.app.MarkerTypes.prototype.getTypeTitle = function(type) {
	return this.model[type].title;
};
demo.app.MarkerTypes.prototype.getTypeDescription = function(type) {
	return this.model[type].description;
};
demo.app.MarkerTypes.prototype.getTypeRange = function(type) {
	return this.model[type].range;
};

demo.app.MarkerTypes.prototype.getTypeFromMagnitude = function(mag) {
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

