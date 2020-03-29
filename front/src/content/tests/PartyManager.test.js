'use strict';

function test_connect() {
	const partyManager = new PartyManager();
	const socket = partyManager.SocketManager.socket; 

	let result = {
		passed: false,
		vars: {
			partyManager,
			socket,
		}
	}

	socket.on('connect', () => {
		result.passed = true;
	})

	socket.on('connect_error', () => {
		result.passed = false;
	})

	return result;
}

setTimeout(() => console.log(test_connect(), 0);