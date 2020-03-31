'use strict';

/* refer to https://stackoverflow.com/questions/15509231/unit-testing-node-js-and-websockets-socket-io for socket.io unit testing */

function test_connect() {
	const socketManager =  new SocketManager.connect('localhost:8000');
	const socket = socketManager.socket;

	const result = {
		passed: false,
		vars: {
			partyManager,
			socket,
		}
	}

	if (socket != null && socket.hasOwnProperty("connected") && socket.connected)
		result.passed = true;

	return result;
}

console.log(test_connect());