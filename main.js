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

	// Inject something into the page to mark that we're here
	$("#room-name").append("<font id='zectWasHere' size='1'> Powered by <a target='_blank' href='https://github.com/ZECTBynmo/plugdat'><font color='red'>ZECTBynmo</font></a></font> v0.0.1");
}


PlugDat.prototype.setupChatHandlers = function() {
	API.on(API.CHAT_COMMAND, callback); function callback(value) {
		switch( value ) {
			// ---------------------------
			// function commands
			// ---------------------------
			case '/show':
		        $("#playback").slideDown();
		        break;
	        case '/hide':
		        $("#playback").slideUp();
		        break;
	        case '/hideall':
	       	 	$("#playback").slideUp();
		        $("#audience").hide()
		        $("#dj-booth").hide()
		        break;
	        case '/showall':
	       	 	$("#playback").slideDown();
		        $("#audience").show()
		        $("#dj-booth").show()
		        break;

			// ---------------------------
			// Emojj
			// ---------------------------
		    case '/whatever':
		        API.sendChat( '¯\\_(ツ)_/¯' );
		        break;
		    case '/tableflip':
		        API.sendChat( '(╯°□°）╯︵ ┻━┻' );
		        break;
	        case '/tablefix':
		        API.sendChat( '\┬\─\┬﻿ ノ( ゜-゜ノ)' );
		        break;
	        case '/seriousface':
	        	API.sendChat( 'ಠ_ಠ' );
	        	break;
	    	case '/monocle':
	        	API.sendChat( 'ಠ_ರೃ' );
	        	break;
	        case '/cat':
	            API.sendChat( '(=ↀωↀ=)' );
	            break;
	        case '/fastcat':
	            API.sendChat( '(ↀДↀ)⁼³₌₃' );
	            break;
	        case '/deadcat':
	            API.sendChat( '(=ｘェｘ=)' );
	            break;
	        case '/sleepycat':
	            API.sendChat( '(≚ᄌ≚)ƶƵ' );
	            break;
	        case '/happycat':
	            API.sendChat( 'ヽ(=^･ω･^=)丿' );
	            break;
	        case '/jazzhands':
	            API.sendChat( 'ლ(=ↀωↀ=)ლ' );
	            break;
	        case '/woof':
	            API.sendChat( '(U・x・U)' );
	            break;
	        case '/squid':
	            API.sendChat( '＜コ：ミ' );
	            break;
	        case '/fish':
	            API.sendChat( '❥᷁)͜͡˒ ⋊' );
	            break;
	        case '/snowman':
	            API.sendChat( '⁝⁝⸃₍⁽΄˙̥΄ ⁾₎⸜☂');
	            break;
	        case '/wizard':
	            API.sendChat( '(∩｀-´)⊃━☆ﾟ.*･｡ﾟ' );
	            break;
	        case '/raiseyourdongers':
	            API.sendChat( 'ヽ༼ ಠ益ಠ ༽ﾉ' );
	            break;
	        case '/fuckyou':
	            API.sendChat( '凸ಠ益ಠ)凸' );
	            break;
		}
	}
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

	$("#zectWasHere").remove();
}



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