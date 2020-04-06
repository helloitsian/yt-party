'use strict';

class SocketManager {
	constructor() {
		this.socket = {};
		this.host = {};
	}

	connect(url) {
		this.socket = io.connect(url);
		this.host = url;

		return this;
	}

	disconnect() {
		if (this.socket.connected)
			this.socket.disconnect();

		return this;
	}


	on(event, cb) {
		this.socket.on(event, cb);
	}

	emit() {
		this.socket.emit(...arguments);
	}
}