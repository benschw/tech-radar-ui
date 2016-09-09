/**
 * @fileoverview Directives to add Tech Radar widgets to a page
 *
 * The website including this project can use these directives to load 
 * radar widgets into their page. the various widgets can interact with
 * each other, allowing for more layout flexibility for the website
 * including the radar while keeping a high degree of integration.
 *
 */

'use strict';

goog.provide('demo.app.RadarWidgetDirectiveFactory');
goog.provide('demo.app.RadarListWidgetDirectiveFactory');
goog.provide('demo.app.DetailsWidgetDirectiveFactory');
goog.provide('demo.app.EditDirectiveFactory');
goog.provide('demo.app.SaveDirectiveFactory');

goog.provide('demo.app.RadarWidgetDirective');
goog.provide('demo.app.RadarListWidgetDirective');
goog.provide('demo.app.DetailsWidgetDirective');
goog.provide('demo.app.EditDirective');
goog.provide('demo.app.SaveDirective');

goog.require('demo.app.RadarWidgetCtrl');
goog.require('demo.app.RadarWidgetCtrl');
goog.require('demo.app.DetailsWidgetCtrl');




/**
 * @ngInject
 */
demo.app.RadarWidgetDirectiveFactory = function() {
	return new demo.app.RadarWidgetDirective();
};

/**
 * Radar Widget
 * @constructor
 */
demo.app.RadarWidgetDirective = function() {
};

/**
 * @export
 */
demo.app.RadarWidgetDirective.prototype.controller = demo.app.RadarWidgetCtrl;

/**
 * @export
 */
demo.app.RadarWidgetDirective.prototype.templateUrl = 'app/tpl/radar-widget.html';

/**
 * @ngInject
 */
demo.app.RadarListWidgetDirectiveFactory = function() {
	return new demo.app.RadarListWidgetDirective();
};

/**
 * Radar List Widget
 * @constructor
 */
demo.app.RadarListWidgetDirective = function() {
};

/**
 * @export
 */
demo.app.RadarListWidgetDirective.prototype.controller = demo.app.RadarWidgetCtrl;

/**
 * @export
 */
demo.app.RadarListWidgetDirective.prototype.templateUrl = 'app/tpl/radar-list-widget.html';


/**
 * @ngInject
 */
demo.app.DetailsWidgetDirectiveFactory = function() {
	return new demo.app.DetailsWidgetDirective();
};

/**
 * Details Widget
 * @constructor
 */
demo.app.DetailsWidgetDirective = function() {
};

/**
 * @export
 */
demo.app.DetailsWidgetDirective.prototype.controller = demo.app.DetailsWidgetCtrl;

/**
 * @export
 */
demo.app.DetailsWidgetDirective.prototype.templateUrl = 'app/tpl/details-widget.html';


/**
 * @ngInject
 */
demo.app.EditDirectiveFactory = function() {
	return new demo.app.EditDirective();
};

/**
 * Edit Button
 * @constructor
 */
demo.app.EditDirective = function() {
};

/**
 * @export
 */
demo.app.EditDirective.prototype.templateUrl = 'app/tpl/edit-button.html';



/**
 * @ngInject
 */
demo.app.SaveDirectiveFactory = function() {
	return new demo.app.SaveDirective();
};

/**
 * Save Button
 * @constructor
 */
demo.app.SaveDirective = function() {
};

/**
 * @export
 */
demo.app.SaveDirective.prototype.templateUrl = 'app/tpl/save-button.html';



