'use strict';
goog.provide('demo.app.radar.Quadrants');

/**
 * @enum {string}
 */
demo.app.radar.Quadrants.view = {
	TL: 'tl',
	TR: 'tr',
	BL: 'bl',
	BR: 'br'
};

/**
 * @enum {string}
 */
demo.app.radar.Quadrants.slug = {
	'techniques' : 'tl',
	'tools'      : 'tr',
	'platforms'  : 'bl',
	'languages'  : 'br'
};

/**
 * @enum {string}
 */
demo.app.radar.Quadrants.titles = {
	'tl': "Techniques",
	'tr': "Tools",
	'bl': "Platforms",
	'br': "Languages & Frameworks"
};

/**
 * @param {string} slug
 * @return {string}
 */
demo.app.radar.Quadrants.lookupSlug = function(slug) {
	return demo.app.radar.Quadrants.slug[slug];
};

/**
 * @param {string} view
 * @return {string}
 */
demo.app.radar.Quadrants.getTitle = function(view) {
	return demo.app.radar.Quadrants.titles[view];
};
