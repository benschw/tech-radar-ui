'use strict';

goog.provide('demo.app.DraggableFactory');
goog.provide('demo.app.Draggable');


/**
 * Draggable Directive
 * @param  {Document} $document (not defined in externs)
 * @constructor
 * @ngInject
 */
demo.app.DraggableFactory = function($document) {
	return new demo.app.Draggable($document);
};
/**
 * Draggable Directive
 * @param  {Document} $document (not defined in externs)
 * @constructor
 */
demo.app.Draggable = function($document) {
	this.msg = "hello";
	/**
	 * @export
	 */
	this.doc = $document;
	console.log([this.msg, this.doc]);
};

/**
 * @param {angular.Scope} scope
 * @param {angular.JQLite} element
 * @param {angular.Attributes} attr
 * @export
 */
demo.app.Draggable.prototype.link = function(scope, element, attr) {
	console.log([this.msg, this.doc, element]);
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
		element.on('mousemove', mousemove);
		element.on('mouseup', mouseup);
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
		var idx = attr.myDraggable ? attr.myDraggable : null;
		console.log(idx, x, y);
		scope.radar.updateLocation(idx, x, y);
		x = 0;
		y = 0;
		transform();
		element.off('mousemove', mousemove);
		element.off('mouseup', mouseup);
	};
	
};
