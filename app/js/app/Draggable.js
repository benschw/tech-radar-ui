'use strict';

goog.provide('demo.app.DraggableFactory');


/**
 * Draggable Directive Factory
 * @param  {angular.JQLite} $document (not defined in externs)
 * @ngInject
 */
demo.app.DraggableFactory = function($document) {

	/**
	 * Draggable Directive
	 * @param {angular.Scope} scope
	 * @param {angular.JQLite} element
	 * @param {angular.Attributes} attr
	 */
	var draggable = function(scope, element, attr) {

		var d = $document;

		var startX = 0;
		var startY = 0;
		var x = 0;
		var y = 0;

		element.css({
			position: 'absolute',
			cursor: 'pointer'
		});

		element.on('mousedown', function(event) {
			if (!scope.editable) {
				return;
			}
			// Prevent default dragging of selected content
			event.preventDefault();
			startX = event.pageX - x;
			startY = event.pageY - y;
			d.on('mousemove', mousemove);
			d.on('mouseup', mouseup);
		});

		var mousemove = function(event) {
			y = event.pageY - startY;
			x = event.pageX - startX;

			transform();
		};
		var transform = function() {
			element.css({
				transform: 'translate('+x+'px,'+y+'px)',
				WebkitTransform: 'translate('+x+'px,'+y+'px)'
			});
			element.css('transform');
		};
		var mouseup = function() {
			scope.radar.updateLocation(attr['myDraggable'], x, y);
			x = 0;
			y = 0;
			transform();
			d.off('mousemove', mousemove);
			d.off('mouseup', mouseup);
		};
	};
	return draggable;
};
