'use strict';

const express = require('express');
const socketio = require('socket.io');
const {createServer} = require('http');

const app = express();
const http = createServer(app);
const io = socketio(http);

io.on('connection', function(socket){
  console.log('a user connected', socket);
});

http.listen(8000, () => {
	console.log('listening on 8000');
})

