'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app');
goog.provide('demo.app.MainConfig');

goog.require('demo.app.HomeCtrl');
goog.require('demo.app.MessagesCtrl');



/**
 * Main Config
 * @param  {ui.router.$stateProvider=} $stateProvider
 * @param  {ui.router.$urlRouterProvider=} $urlRouterProvider
 * @constructor
 * @export
 * @ngInject
 */
demo.app.MainConfig = function ($stateProvider, $urlRouterProvider) {
	console.log('cfg');

	$urlRouterProvider.otherwise('/');
	var root = {
		'abstract': true,
		views: {
			'': {
				templateUrl: 'views/root.html'
			}
		}
	};
	var layout = {
		'abstract': true,
		'parent': root,
		views: {
			'header' : {
				templateUrl: 'views/header.html'
			},
			'left' : {
				templateUrl: 'views/left.html'
			},
		}
	};
	var home = {
		url: "/",
		'parent': layout,
		views: {
			'main@root': {
				controller: 'demo.app.HomeCtrl',
				templateUrl: 'views/home.html'
			}
		}
	};
	var messages = {
		url: "/messages",
		'parent': layout,
		views: {
			'main@root': {
				controller: 'demo.app.MessagesCtrl',
				templateUrl: 'views/messages.html'
			}
		}
	};
	$stateProvider
		.state('root', root)
		.state('root.layout', layout)
		.state('root.layout.messages', messages)
		.state('root.layout.home', home);
};




/** 
 * @type {angular.Module} 
 **/
demo.app = angular.module('demo.app', [
		'ngRoute',
		'ui.router',
		'ui.bootstrap'
	])
	.config(demo.app.MainConfig)
	.controller('demo.app.HomeCtrl', demo.app.HomeCtrl)
	.controller('demo.app.MessagesCtrl', demo.app.MessagesCtrl);


