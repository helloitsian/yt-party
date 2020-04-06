'use strict';

class PartyManager {
	constructor() {
		this.SocketManager =  new SocketManager();
		this.party = {
			name: "",
			videoUrl: "",
			viewers: [],
		};
		this.role = "host"; // either host or viewer
		this.video = null;
		this.videoTime = null;
		this.videoStatus = null; // either paused or playing
	}
}