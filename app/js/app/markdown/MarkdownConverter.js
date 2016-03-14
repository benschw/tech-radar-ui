'use strict';

goog.provide('demo.app.markdown.MarkdownConverterFactory');


/**
 * @ngInject
 */
demo.app.markdown.MarkdownConverterFactory = function() {
	var opts = {};
	return {
		'config': function (newOpts) {
			opts = newOpts;
		},
		'$get': function () {
			return new showdown.Converter({'tables': true});
		}
	};
};
