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
	// Some member variables
	this.chatHistory = [];
	this.iCurrentHistoryItem = 0;

	// Setup various components
	this.startAutoWoot();
	this.setupChatHandlers();
	//this.setupAutoSkip();
	this.setupChatHistory();

	// Inject something into the page to mark that we're here
	$("#room-name").append("<font id='zectWasHere' size='1'> <a target='_blank' href='https://github.com/ZECTBynmo/plugdat'><font color='red'>PlugDat</font></a> v0.4.3</font>");
}


PlugDat.prototype.setupChatHistory = function() {
	var _this = this;

	var updateChatFromHistory = function() {
		$('#chat-input-field').val( _this.chatHistory[_this.iCurrentHistoryItem] );
	};

	$("#chat-input-field").keydown(function(event){
		// We only care about up and down key presses
		if( event.keyCode != 38 && event.keyCode != 40 )
			return;

		if( _this.isDisabled )
			return true;

		if( event.keyCode == 38 && _this.iCurrentHistoryItem > 0) {
			_this.iCurrentHistoryItem -= 1;
		}

		if( event.keyCode == 40 && _this.iCurrentHistoryItem < _this.chatHistory.length ) {
			_this.iCurrentHistoryItem += 1;
		}

		updateChatFromHistory();
	});
}


PlugDat.prototype.setupAutoSkip = function() {
	this.autoSkipTimer = setInterval( function() {
		if( API.getTimeRemaining() <= 0 )
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

	this.isDisabled = true;

	$("#zectWasHere").remove();
}


PlugDat.prototype.setupChatHandlers = function() {
	var _this = this;

	if( this.justHandledTimers === undefined )
		this.justHandledTimers = {};

	API.on( API.CHAT, function(value) {
		// If we're disabled, that means this is a callback sitting around from
		// who knows when. Just do nothing.
		if( _this.isDisabled || value.fromID == API.getUser() )
			return;

		_this.chatHistory.push( value.message );
		_this.iCurrentHistoryItem = _this.chatHistory.length;
	});


	API.on( API.CHAT_COMMAND, function(value) {
		// If we're disabled, that means this is a callback sitting around from
		// who knows when. Just do nothing.
		if( _this.isDisabled )
			return;

		// Look through each command
		for( var iCommand in commands ) {

			// Create a new handler timer if we don't have one already
			// This will set an all clear flag in two seconds to continue on with the command
			_this.justHandledTimers[iCommand] = _this.justHandledTimers[iCommand] || {
				isClear: true,
				resetTimeout: function( handler ) {
					setTimeout( function() {
						handler.isClear = true;
					}, 2000);
				}
			};

			// Create a closure so that we can preserve variables while we loop
			(function(){

				// Preserve this template for closure
				var thisHandler = _this.justHandledTimers[iCommand];

				// If this command contains a keyword, go forward
				if( value.indexOf(iCommand) != -1 ) {

					// Now, if we're clear to respond to the command, go for it
					if( thisHandler.isClear ) {
						// Start the timer so we don't accidentally launch a second one immediately
						thisHandler.isClear = false;
						thisHandler.resetTimeout( thisHandler );

						if( typeof(commands[iCommand]) == "string" ) {
							console.log( "Spitting out some ascii or something" );
							API.sendChat( commands[iCommand] );
						} else {
							console.log( "Calling handler function" );
							commands[iCommand]( value );
						}
					}
				}
			})(); // end anonymous function
		} // end for each command
	}); // end API.on( API.CHAT_COMMAND )
} // end setupChatHandlers()


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
	"/bg": function( command ) {
		var url = command.split(" ")[1];

		if( url == "pdnb" )
			url = 'url("http://i.imgur.com/WrZcAT7.jpg")';
		else if( url == "tt" || url == "TT" )
			url = 'url("http://i.imgur.com/wDMYMlQ.png")';
		else {
			url = 'url(' + url + ')';
		}		

		$('.room-background').css('background-image', url);
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
	"/fuckyou": 			"凸(ಠ益ಠ)凸",
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
