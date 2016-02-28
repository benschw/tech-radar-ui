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
	var quadrant = {
		url: "/:quadrant",
		'parent': layout,
		views: {
			'main@root': {
				controller: 'demo.app.RadarCtrl',
				templateUrl: 'app/tpl/radar.html'
			}
		},
		resolve:{
			quadrant: ['$stateParams', function($stateParams){
				return $stateParams.quadrant;
			}]
		}
	};
	var details = {
		url: "/:id",
		'parent': quadrant,
		views: {
			'main@root': {
				controller: 'demo.app.DetailsCtrl',
				templateUrl: 'app/tpl/details.html'
			}
		}
	};
	$stateProvider
		.state('root', root)
		.state('root.layout', layout)
		.state('root.layout.home', home)
		.state('root.layout.quadrant', quadrant)
		.state('root.layout.quadrant.details', details);
};



