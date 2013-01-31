/*
	Totem Ticker Plugin
	Copyright (c) 2011 Zach Dunn / www.buildinternet.com
	Released under MIT License
	--------------------------
	Structure based on Doug Neiner's jQuery plugin blueprint: http://starter.pixelgraphics.us/
	
	Updates By: Jeremy Pyne http://pynej.blogspot.com
*/
(function( $ ){
	
	if(!$.omr){
		$.omr = new Object();
	};

	$.omr.totemticker = function(el, options ) {
	  	
	  	var base = this;
	  	
		//Define the DOM elements
	  	base.el = el;
	  	base.$el = $(el);
	  	
	  	// Add a reverse reference to the DOM object
        base.$el.data("omr.totemticker", base);
	  	
	  	base.init = function(){
            base.options = $.extend({},$.omr.totemticker.defaultOptions, options);
            
            //Define the ticker object
           	base.ticker;
			
			//Adjust the height of ticker if specified
			base.format_ticker();
			
			//Setup navigation links (if specified)
			base.setup_nav();
			
			//Setup mouse wheel scrolling.
			base.setup_scroll();
			
			//Start the ticker
			base.start_interval();
			
			//Debugging info in console
			//base.debug_info();
        };
		
		base.start_interval = function(){
			
			//Clear out any existing interval
			clearInterval(base.ticker);
			
			if (base.options.direction == 'up') {
				//If the direction has been set to up
				base.ticker = setInterval(function() {
					base.$el.find('li:last').detach().prependTo(base.$el).css('marginTop', '-' + base.options.row_height);
					base.$el.find('li:first').animate({
				        marginTop: '0px'
				    }, base.options.speed, function () {
				        //Callback functions go here
				    });
				}, base.options.interval);
			}else{
				//Otherwise, run the default of down
		    	base.ticker = setInterval(function() {
		    	
		    		base.$el.find('li:first').animate({
		            	marginTop: '-' + base.options.row_height
		            }, base.options.speed, function() {
		                $(this).detach().css('marginTop', '0').appendTo(base.$el);
		            });
		            
		    	}, base.options.interval);
	    	}
	    }
	    
	    base.reset_interval = function(){
	    	clearInterval(base.ticker);
	    	base.start_interval();
	    }
	    
	    base.stop_interval = function(){
	    	clearInterval(base.ticker);
	    }
	
		base.format_ticker = function(){
			base.$el.addClass("vTicker");
			if(typeof(base.options.max_items) != "undefined" && base.options.max_items != null) {
				base.$el.find('li').outerHeight(base.options.row_height);
				
				//Remove units of measurement (Should expand to cover EM and % later)
				var stripped_height = base.options.row_height.replace(/px/i, '');
				var ticker_height = stripped_height * base.options.max_items;
			
				base.$el.css({
					height		: ticker_height + 'px', 
					overflow	: 'hidden'
				});
				
			}else{
				//No heights were specified, so just doublecheck overflow = hidden
				base.$el.css({
					overflow	: 'hidden'
				})
			}
			
		}
	
		base.setup_nav = function(){
			
			//Stop Button
			if (typeof(base.options.stop) != "undefined"  && base.options.stop != null){
				$(base.options.stop).click(function(){
					base.stop_interval();
					return false;
				});
			}
			
			//Start Button
			if (typeof(base.options.start) != "undefined"  && base.options.start != null){
				$(base.options.start).click(function(){
					base.start_interval();
					return false;
				});
			}
			
			//Previous Button
			if (typeof(base.options.previous) != "undefined"  && base.options.previous != null){
				$(base.options.previous).click(function(){
					base.previous();
				    return false;
				});
			}
			
			//Next Button
			if (typeof(base.options.next) != "undefined" && base.options.next != null){
				$(base.options.next).click(function(){
					base.next();
			        return false;
				});
			}
			
			//Stop on mouse hover
			if (typeof(base.options.mousestop) != "undefined" && base.options.mousestop === true) {
				base.$el.mouseenter(function(){
					base.stop_interval();
				}).mouseleave(function(){
					base.start_interval();
				});
			}
			
			/*
				TO DO List
				----------------
				Add a continuous scrolling mode
			*/
		}
			
		base.setup_scroll = function(){
			if(typeof $.event.special.mousewheel != "undefined") {
			base.$el.mousewheel(function() {
				if(!base.options.scrolling && base.options.mouse_scroll) {
					
					base.options.scrolling = true;
					setTimeout(function() {
						base.options.scrolling = false;
					}, base.options.speed);
					
					if(event.wheelDeltaY > 0 || event.wheelDelta > 0)
						base.previous();
					else
						base.next();
				}
				return false;
			});
			}
		}
		
		base.debug_info = function()
		{
			//Dump options into console
			console.log(base.options);
		}
		
		base.stop = function() {
			base.stop_interval();
		}
		
		base.start = function() {
			base.start_interval();
		}
			
		base.previous = function() {
			base.$el.find('li:last').detach().prependTo(base.$el).css('marginTop', '-' + base.options.row_height);
			base.$el.find('li:first').animate({
				marginTop: '0px'
			}, base.options.speed, function () {
				base.reset_interval();
			});
		}
			
		base.next = function() {
			base.$el.find('li:first').animate({
				marginTop: '-' + base.options.row_height
			}, base.options.speed, function() {
				$(this).detach().css('marginTop', '0px').appendTo(base.$el);
				base.reset_interval();
			});
		}
			
		//Make it go!
		base.init();
  };
  
  $.omr.totemticker.defaultOptions = {
  		message		:	'Ticker Loaded',	/* Disregard */
  		next		:	null,		/* ID of next button or link */
  		previous	:	null,		/* ID of previous button or link */
  		stop		:	null,		/* ID of stop button or link */
  		start		:	null,		/* ID of start button or link */
  		row_height	:	'100px',	/* Height of each ticker row in PX. Should be uniform. */
  		speed		:	800,		/* Speed of transition animation in milliseconds */
  		interval	:	4000,		/* Time between change in milliseconds */
		max_items	: 	null, 		/* Integer for how many items to display at once. Resizes height accordingly (OPTIONAL) */
	  	mousestop	:	false,		/* If set to true, the ticker will stop on mouseover */
		direction	:	'down',		/* Direction that list will scroll */
	  	mouse_scroll: 	true		/* Scroll the ticker with the mosue wheel if the jquery.mousewheel plugin is loaded. (http://brandonaaron.net/code/mousewheel/docs) */
  };
  
  $.fn.totemticker = function( options , args ){
    return this.each(function(){
			var instance = $.data(this, "omr.totemticker");
			if (instance) {
				instance[options].apply(instance, args);
			} else {
				instance = $.data(this, "omr.totemticker", new $.omr.totemticker(this, options));
			}
  	});
  };
  
})( jQuery );