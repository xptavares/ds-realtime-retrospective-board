var rdContas = require('./rd-contas.js')
var DeepstreamServer = require( 'deepstream.io' );
var tutorialServer = new DeepstreamServer();

tutorialServer.set( 'host', 'localhost' );
tutorialServer.set( 'port', 6020 );

tutorialServer.set( 'permissionHandler', {
	isValidUser: function( connectionData, authData, callback ) {
		rdContas.login(authData.username, authData.password, callback);
	},

	canPerformAction: function( username, message, callback ) {
		 // allow everything as long as the client is logged in
		callback( null, true );
	}
});

tutorialServer.start();
