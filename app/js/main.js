'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo');

goog.require('demo.app.module');

angular.element(document).ready(function() {
	angular.bootstrap(document, ['demo.app']);
});
