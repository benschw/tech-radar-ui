'use strict';
goog.provide('demo.app.Quadrants');

/**
 * @enum {string}
 */
demo.app.Quadrants.view = {
	TL: 'tl',
	TR: 'tr',
	BL: 'bl',
	BR: 'br'
};
/**
 * @enum {string}
 */
demo.app.Quadrants.slug = {
	'techniques' : 'tl',
	'tools'      : 'tr',
	'platforms'  : 'bl',
	'languages'  : 'br'
};

demo.app.Quadrants.titles = {
	'tl': "Techniques",
	'tr': "Tools",
	'bl': "Platforms",
	'br': "Languages & Frameworks"
};

demo.app.Quadrants.lookupSlug = function(slug) {
	return demo.app.Quadrants.slug[slug];
};
demo.app.Quadrants.getTitle = function(view) {
	return demo.app.Quadrants.titles[view];
};
