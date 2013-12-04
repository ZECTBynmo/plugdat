API.on(API.CHAT_COMMAND, callback); function callback(value) {
	switch( value ) {
	    case '/whatever':
	        API.sendChat( '¯\\_(ツ)_/¯' );
	        break;
	    case '/tableflip':
	        API.sendChat( '(╯°□°）╯︵ ┻━┻' );
	        break;
        case '/tablefix':
	        API.sendChat( 'ノ( º _ ºノ)' );
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

$("#room-name").append(" ZECT's Emoji Enabled");
