'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.module');

goog.require('demo.app.Config');
goog.require('demo.app.HomeCtrl');
goog.require('demo.app.MessagesCtrl');



/** 
 * @type {angular.Module} 
 **/
demo.app.module = angular.module('demo.app', [
		'ngRoute',
		'ui.router',
		'ui.bootstrap'
	])
	.config(demo.app.Config)
	.controller('demo.app.HomeCtrl', demo.app.HomeCtrl)
	.controller('demo.app.MessagesCtrl', demo.app.MessagesCtrl);



