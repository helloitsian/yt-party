'use strict';

const express = require('express');
const socketio = require('socket.io');
const {createServer} = require('http');

const app = express();
const http = createServer(app);
const io = socketio(http);

const parties = { }

io.on('connection', function(socket){
  console.log('a user connected');

  socket.on('dev-test', () => {
    console.log("DEV EVENT RECEIVED");
    io.emit('dev-test');
  })

  socket.on('join-party', (party, cb) => {
    const { name, videoUrl } = party; 
    const cleaned = name; // TODO: Clean input

    // if the party exists, add the viewer to it, if not, make a new party and set user as host
    if (parties.hasOwnProperty(cleaned)) {
      parties[cleaned].viewers.push(socket.id);
      socket.join(party);
      cb(parties[cleaned]);
    } else { 
      parties[cleaned] = {
        name: cleaned,
        viewers: [ ],
        host: socket.id,
        videoUrl,
      } 
      socket.join(party);

      cb(parties[cleaned]);
    }
  })

  socket.on('leave-party', (party) => {
    const name = party.name; // TODO: Clean input
    if (parties.hasOwnProperty(name)) {
      // if the host leaves, delete the party in our parties object
      
      if (socket.id === parties[name].host) {
        delete parties[name];
        socket.leave(party);
      }

      // if a viewer leaves, just remove viewer from viewers arr for party obj.
      parties[name].viewers = parties[name].viewers.filter((viewer) => viewer !== socket.id);
      socket.leave(name);
    }
  })

  socket.on('pause-video', (party) => {
  	console.log("RECEIVED pause-video EVENT", party);
  	//io.in(party).emit('pause-video');
    io.in(party).emit('pause-video');
  });

  socket.on('play-video', (party) => {
  	console.log("RECEIVED play-video EVENT", party);
  	//io.in(party).emit('pause-video');
    io.in(party).emit('play-video');
  });
});

http.listen(8000, () => {
	console.log('listening on 8000');
})

