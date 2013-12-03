API.on(API.CHAT_COMMAND, callback); function callback(value) { 
	switch( value ) {
	    case "/whatever":
	        API.sendChat( "¯\\_(ツ)_/¯" );
	        break;
	    case "/tableflip":
	        API.sendChat( "(╯°□°）╯︵ ┻━┻" );
	        break;
        case "/tablefix":
	        API.sendChat( "ノ( º _ ºノ)" );
	        break;
        case "/seriousface":
        	API.sendChat( "ಠ_ಠ" );
        	break;
    	case "/monocle":
        	API.sendChat( "ಠ_ರೃ" );
        	break;
	}
}