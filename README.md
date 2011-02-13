# Totem Ticker jQuery Plugin

Totem is a jQuery plugin that turns lists into animated vertical tickers. It supports navigation and basic animation control.

## Getting Started

A sample ticker might look something like this.

    $('#vertical-ticker').totemticker({
	row_height	:	'100px',
	next		:	'#ticker-next',
	previous	:	'#ticker-previous',
	stop		:	'#stop',
	start		:	'#start',
    });

### Options

The following options are available via the plugin array. Defaults are listed below.

    next		:	null,		/* ID of next button or link */
    previous	:	null,		/* ID of previous button or link */
    stop		:	null,		/* ID of stop button or link */
    start		:	null,		/* ID of start button or link */
    row_height	:	'100px',	/* Height of each ticker row in PX. Should be uniform. */
    speed		:	800,		/* Speed of transition animation in milliseconds */
    interval	:	4000,		/* Time between change in milliseconds */
    max_items	: 	null, 		/* Integer for how many items to display at once. Resizes height accordingly (OPTIONAL) */
    stopmouse	:	false,		/* If set to true, the ticker will stop while mouse is hovered over it */

** More documentation to follow **