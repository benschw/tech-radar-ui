'use strict';

goog.provide('demo.app.ScrollOnClick');


/**
 * Draggable Directive
 * @param  {*=} $document (not defined in externs)
 * @constructor
 * @ngInject
 */
demo.app.ScrollOnClick = function() {
	return {
		restrict: 'A',
		link: function(scope, $elm, $attr) {
			$elm.on('click', function() {
				var el = $("#marker-"+$attr.scrollOnClick)
				// -50 is a hack for bootstrap fixed top nav
				$("body").animate({scrollTop: el.offset().top - 50}, "slow");
			});
		}
	}
};
