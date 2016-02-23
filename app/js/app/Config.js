'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.Config');

/**
 * Main Config
 * @param  {ui.router.$stateProvider=} $stateProvider
 * @param  {ui.router.$urlRouterProvider=} $urlRouterProvider
 * @constructor
 * @export
 * @ngInject
 */
demo.app.Config = function ($stateProvider, $urlRouterProvider) {

	$urlRouterProvider.otherwise('/');
	var root = {
		'abstract': true,
		views: {
			'': {
				templateUrl: 'app/tpl/root.html'
			}
		}
	};
	var layout = {
		'abstract': true,
		'parent': root,
		views: {
			'header' : {
				templateUrl: 'app/tpl/header.html'
			}
		}
	};
	var home = {
		url: "/",
		'parent': layout,
		views: {
			'main@root': {
				controller: 'demo.app.HomeCtrl',
				templateUrl: 'app/tpl/home.html'
			}
		}
	};
	var messages = {
		url: "/messages",
		'parent': layout,
		views: {
			'main@root': {
				controller: 'demo.app.MessagesCtrl',
				templateUrl: 'app/tpl/messages.html'
			}
		}
	};
	$stateProvider
		.state('root', root)
		.state('root.layout', layout)
		.state('root.layout.messages', messages)
		.state('root.layout.home', home);
};



