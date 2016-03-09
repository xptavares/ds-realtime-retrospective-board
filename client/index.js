var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static('public'));

var players = [];

io.on('connection', function(socket){
  console.log('a user connected');

  players.forEach(function(player) {
    io.emit('new player', player);
  });

  socket.on('disconnect', function(){
    console.log('user disconnected');
  });

  socket.on('move player', function(data) {
    io.emit('move other player', data);
  });

  socket.on('create new player', function(player){
    players.push(player);
    
    io.emit('new player', player);
  });
});

http.listen(3000, function(){
  console.log('listening on *:3000');
});
