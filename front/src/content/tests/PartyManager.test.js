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

	result.vars.socket.on('connect', () => {
		result.passed = true;
	})

	result.vars.socket.socket.on('connect_error', () => {
		result.passed = false;
	})

	return result;
}

function test_hostParty() {
	const hostManager = new PartyManager();
	
	hostManager.hostParty();
	const partyName = hostManager.party;

	const video = hostManager.video;

	const viewManager = new PartyManager();
	viewManager.joinParty(partyName);

	pauseVideo(video);

	const result = {
		passed: false,
		vars: {
			hostManager,
			viewManager,
			videoStatus: video.playing,
		}
	}

	if (viewManager.videoStatus === "paused")
		result.passed === true;

	return result;
}

console.log("testing hostParty");
console.log(test_hostParty());