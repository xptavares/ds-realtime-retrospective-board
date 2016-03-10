var request = require('request');
var login = function(username, password, callback) {
  if( !username ) {
    return callback( 'No username specified' );
  }
  var url = 'http://localhost:4000/user/sign_in.json';
  var optionalCallback = function(err, httpResponse, body) {
    if (err) {
      console.error('upload failed:', err);
      return callback( 'Wrong password' );
    }
    jsonBody = JSON.parse(body);
    if(jsonBody.error) {
      console.error('upload failed:', jsonBody.error);
      return callback( 'Wrong password' );
    }
    console.log('jsonBody:', jsonBody);
  };
  var user = {
    email: username,
    password: password
  };
  request.post({ url: url, user: user }, optionalCallback);
  // request.post(url).form({user: user});
  callback( null, username );
};

exports.login = login;
