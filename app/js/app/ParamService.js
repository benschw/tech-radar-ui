'use strict';

goog.provide('demo.app.ParamServiceFactory');
goog.provide('demo.app.ParamService');

/**
 * @constructor
 * @ngInject
 */
demo.app.ParamServiceFactory = function() {
	return new demo.app.ParamService();
};

/**
 * @constructor
 * @ngInject
 */
demo.app.ParamService = function() {

};

/**
 * @param {string} key
 * @return {string}
 */
demo.app.ParamService.prototype.parseParam = function(key) {
	var result = "Not found";
	location.search
		.substr(1) // skip "?"
		.split("&")
		.forEach(function (item) {
			var tmp = item.split("=");
			if (tmp[0] === key) {
				result = decodeURIComponent(tmp[1]);
			}
		});
	return result;
};
