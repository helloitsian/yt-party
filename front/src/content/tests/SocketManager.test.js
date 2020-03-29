'use strict';

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