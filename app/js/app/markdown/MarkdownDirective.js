'use strict';

goog.provide('demo.app.markdown.MarkdownDirectiveFactory');


/**
 * @param {angular.$sanitize} $sanitize
 * @param {*} markdownConverter
 * @ngInject
 */
demo.app.markdown.MarkdownDirectiveFactory = function($sanitize, markdownConverter) {
	return {
		'restrict': 'AE',
		'link': function (scope, element, attrs) {
			if (attrs['markdown']) {
				scope.$watch(attrs['markdown'], function (newVal) {
					var html = newVal ? $sanitize(markdownConverter.makeHtml(newVal)) : '';
					element.html(html);
					element.find('table').addClass('table table-striped');
				});
			} else {
				var html = $sanitize(markdownConverter.makeHtml(element.text()));
				element.html(html);
				element.find('table').addClass('table table-striped');
			}
		}
	};
};
