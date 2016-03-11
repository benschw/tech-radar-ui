'use strict';

goog.provide('demo.app.markdown.module');

goog.require('demo.app.markdown.MarkdownDirectiveFactory');
goog.require('demo.app.markdown.MarkdownConverterFactory');

/**
 * @type {angular.Module} 
 */
demo.app.markdown.module = angular.module('demo.app.markdown', [
		'ngSanitize'
	])
	.provider('markdownConverter', demo.app.markdown.MarkdownConverterFactory)
	.directive('markdown', demo.app.markdown.MarkdownDirectiveFactory)

	;


