# Totem Ticker jQuery Plugin - v2.1

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
    mousestop	:	false,		/* If set to true, the ticker will stop while mouse is hovered over it */
    direction	:	'down'		/* Direction that list will scroll */
    mouse_scroll:       true            /* Scroll the ticker with the mosue wheel if the jquery.mousewheel plugin is loaded. (http://brandonaaron.net/code/mousewheel/docs) */
    disableOnBlur: 	false		/* Start and stop the ticker automaticaly when the window loses focus. */


The following functions are also supported.

    $(selector).totemticker("start");
    $(selector).totemticker("stop");
    $(selector).totemticker("previous");
    $(selector).totemticker("next");

## Contact

- http://twitter.com/zachdunn
- zach@onemightyroar.com

## Version 2 Changes

- Added support for mouse whee scrolling.
- Tickers now all get the vTicker class for css markup.
- If a row height is specified that the items are now actually restricted to that height.  Add the following css to make longer items scroll properly.
        .vTicker li { overflow: hidden; }
- Added helper methods for easy scripting of the ticker.
        $(selector).totemticker("start");
        $(selector).totemticker("stop");
        $(selector).totemticker("previous");
        $(selector).totemticker("next");
        
 - Jeremy Pyne
 - http://pynej.blogspot.com

## Version 2.1 Changes

- Now triggers a change event on element rotations.  You can now do this:
        $(selector).totemticker().change(function() {console.log("I was rotated.");})
- Added disableOnBlur option to pause the ticker when the browser window loses focus.

- Jeremy Pyne
- http://pynej.blogspot.com