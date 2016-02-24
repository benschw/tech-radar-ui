'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.module');

goog.require('cache.tpl');
goog.require('demo.app.Draggable');
goog.require('demo.app.Config');
goog.require('demo.app.HomeCtrl');
goog.require('demo.app.RadarCtrl');

/*
 * @type {angular.Module} 
 */
demo.app.module = angular.module('demo.app', [
		'ngRoute',
		'ui.router',
		'ui.bootstrap',
		cache.tpl.name
	])
	.config(demo.app.Config)
	.controller('demo.app.HomeCtrl', demo.app.HomeCtrl)
	.controller('demo.app.RadarCtrl', demo.app.RadarCtrl)
	.directive('myDraggable', ['$document', demo.app.Draggable])
	.directive('scrollOnClick', function() {
		return {
			restrict: 'A',
			link: function(scope, $elm, $attr) {
				$elm.on('click', function() {
					var el = $("#marker-"+$attr.scrollOnClick)
					$("body").animate({scrollTop: el.offset().top}, "slow");
				});
			}
		}
	});
