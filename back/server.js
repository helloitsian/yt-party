'use strict';

const express = require('express');
const socketio = require('socket.io');
const {createServer} = require('http');

const app = express();
const http = createServer(app);
const io = socketio(http);

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('pause-video', () => {
  	console.log("RECEIVED pause-video EVENT");
  	socket.broadcast.emit('pause-video');
  });

  socket.on('play-video', () => {
  	console.log("RECEIVED play-video EVENT");
  	socket.broadcast.emit('play-video');
  });
});

http.listen(8000, () => {
	console.log('listening on 8000');
})

