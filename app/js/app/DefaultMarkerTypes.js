'use strict';
/**
 * @fileoverview Master bootstrap file.
 */
goog.provide('demo.app.DefaultMarkerTypes');

goog.require('demo.app.MarkerTypes');

demo.app.DefaultMarkerTypes = function() {

	return new demo.app.MarkerTypes({
		adopt: {
			title: "Adopt",
			description: "The Adopt Ring represents blips that we think you should be using now. We don't say that you should use these for every project; any tool should only be used in an appropriate context. However we do think that a blip in the adopt ring represents something where there is no doubt that it's proven and mature for use.",
			range: [0, 0.4]
		},
		trial: {
			title: "Trial",
			description: "The Trial Ring is for blips that we think are ready for use, but not as completely proven as those in the adopt ring. So for most organizations we think you should use these on a trial basis, to decide whether they should be part of your toolkit. Typically we are happy to use trial blips now, but we realize that most readers will be more cautious than us.",
			range: [0.4, 0.65]
		},
		assess: {
			title: "Assess",
			description: "The Assess Ring are things that you should look at closely, but not necessarily trial yet - unless you think they would be a particularly good fit for you. Typically blips in the assess ring are things that we are currently trialling, on our projects.",
			range: [0.65, 0.85]
		},
		hold: {
			title: "Hold",
			description: "The Hold Ring is for things that are getting attention in the industry, but we don't think are ready for use. Sometimes this is because we don't think they are mature enough yet, sometimes it means we think they are irredeemably flawed. We don't have an \"avoid\" ring, but we do throw things in the hold ring that we wish our clients wouldn't use.",

			range: [0.85, 1]
		}
	});
};
