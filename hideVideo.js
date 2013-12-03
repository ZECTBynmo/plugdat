if( document.__hasHiddenVideo == undefined ) {
	document.__hasHiddenVideo = false;
}

if( !document.__hasHiddenVideo ) {
	document.__hasHiddenVideo = true;
	console.log( "hiding video" );
	$("#playback").slideUp();
} else {
	document.__hasHiddenVideo = false;
	console.log( "showing video" );
	$("#playback").slideDown();
}