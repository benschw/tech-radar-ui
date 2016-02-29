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

demo.app.radar.Quadrants.titles = {
	'tl': "Techniques",
	'tr': "Tools",
	'bl': "Platforms",
	'br': "Languages & Frameworks"
};

demo.app.radar.Quadrants.lookupSlug = function(slug) {
	return demo.app.radar.Quadrants.slug[slug];
};
demo.app.radar.Quadrants.getTitle = function(view) {
	return demo.app.radar.Quadrants.titles[view];
};
