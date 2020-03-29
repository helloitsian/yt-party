'use strict';

class SocketManager {
	constructor() {
		this.socket = {};
		this.host = {};
	}

	connect(url) {
		this.socket = io.connect(url);
		this.host = url;

		this.on('connect', (socket) => {
			console.log('Connection established', socket);
		})

		return this;
	}

	on(event, cb) {
		this.socket.on(event, cb);
	}
}