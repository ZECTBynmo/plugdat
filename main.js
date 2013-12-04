//////////////////////////////////////////////////////////////////////////
// PlugDat - Some tools and fun stuff for plug.dj
//////////////////////////////////////////////////////////////////////////
//
// Main script!
/* ----------------------------------------------------------------------
													Object Structures
-------------------------------------------------------------------------
	
*/
//////////////////////////////////////////////////////////////////////////
// Constructor
function PlugDat() {
	// Setup various components
	this.startAutoWoot();
	this.setupChatHandlers();
	this.setupAutoSkip();

	// Inject something into the page to mark that we're here
	$("#room-name").append("<font id='zectWasHere' size='1'> <a target='_blank' href='https://github.com/ZECTBynmo/plugdat'><font color='red'>PlugDat</font></a> v0.2.3</font>");
}


PlugDat.prototype.setupAutoSkip = function() {
	this.autoSkipTimer = setInterval( function() {
		if( API.getTimeRemaining() < 0 )
			API.moderateForceSkip()
	}, 5000);	
}


PlugDat.prototype.stopAutoSkip = function() {
	// Stop our auto-woot timer if it exists
	if( this.autoSkipTimer != undefined )
		clearInterval( this.autoSkipTimer );
}


PlugDat.prototype.startAutoWoot = function() {
	// Press the button immediately so the user can see the effects
	$("#woot").click();

	// Start a timer to press the button every 45 seconds
	this.autoWootTimer = setInterval( function() {
		$("#woot").click();
	}, 45000);
}


PlugDat.prototype.stopAutoWoot = function() {
	// Stop our auto-woot timer if it exists
	if( this.autoWootTimer != undefined )
		clearInterval( this.autoWootTimer );
}


PlugDat.prototype.cleanUp = function() {
	console.log( "Cleaning up PlugDat" );

	this.stopAutoWoot();
	this.stopAutoSkip();

	$("#zectWasHere").remove();
}


PlugDat.prototype.setupChatHandlers = function() {
	var _this = this;

	if( this.justHandledTimers === undefined )
		this.justHandledTimers = {};

	API.on( API.CHAT_COMMAND, function(value) {
		for( var iCommand in commands ) {
			if( value.indexOf(iCommand) != -1 ) {
				// Create a new handler timer if we don't have one already
				// This will set an all clear flag in two seconds to continue on with the command
				_this.justHandledTimers[iCommand] = _this.justHandledTimers[iCommand] || {
					isClear: true,
					resetTimeout: function( self ) { 
						setTimeout( function() {
							self.justHandledTimers[iCommand].isClear = true;
						}, 2000);
					}
				}

				// Now, if we're clear to respond to the command, go for it
				if( _this.justHandledTimers[iCommand].isClear ) {
					// Start the timer so we don't accidentally launch a second one immediately
					_this.justHandledTimers[iCommand].isClear = false;
					_this.justHandledTimers[iCommand].resetTimeout( _this );

					if( typeof(commands[iCommand]) == "string" )
						API.sendChat( commands[iCommand] );
					else
						commands[iCommand];
				}				
			}
		}
	});
}

console.log( commands );
var commands = {
	"/show": function() {
		$("#playback").slideDown();
	},
	"/hide": function() {
		$("#playback").slideUp();
	},
	"/hideall": function() {
		$("#playback").slideUp();
        $("#audience").hide()
        $("#dj-booth").hide()
	},
	"/showall": function() {
		$("#playback").slideDown();
        $("#audience").show()
        $("#dj-booth").show()
	},
	"/whatever": 			"¯\\_(ツ)_/¯",
	"/tableflip": 			"(╯°□°）╯︵ ┻━┻",
	"/tablefix": 			"\┬\─\┬﻿ ノ( ゜-゜ノ)",
	"/seriousface": 		"ಠ_ಠ",
	"/cat": 				"(=ↀωↀ=)",
	"/fastcat": 			"(ↀДↀ)⁼³₌₃",
	"/deadcat": 			"(=ｘェｘ=)",
	"/sleepycat": 			"(≚ᄌ≚)ƶƵ",
	"/happycat": 			"ヽ(=^･ω･^=)丿",
	"/pootcat": 			"(ↀДↀ)⁼³₌₃",
	"/jazzhands": 			"ლ(=ↀωↀ=)ლ",
	"/woof": 				"(U・x・U)",
	"/squid": 				"＜コ：ミ",
	"/fish": 				"❥᷁)͜͡˒ ⋊",
	"/snowman": 			"⁝⁝⸃₍⁽΄˙̥΄ ⁾₎⸜☂",
	"/wizard": 				"(∩｀-´)⊃━☆ﾟ.*･｡ﾟ",
	"/raiseyourdongers": 	"ヽ༼ ಠ益ಠ ༽ﾉ",
	"/fuckyou": 			"凸ಠ益ಠ)凸",
};


// -----------------------------------------------------------------
// Create or destroy ourselves depending on the current situation
// -----------------------------------------------------------------
if( document.PlugDat === undefined ) {
	console.log( "Creating PlugDat" );
	document.PlugDat = new PlugDat();
} else {
	console.log( "Destroying PlugDat" );
	document.PlugDat.cleanUp();
	document.PlugDat = undefined;
}
// -----------------------------------------------------------------