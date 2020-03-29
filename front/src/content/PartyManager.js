'use strict';

class PartyManager {
	constructor() {
		this.SocketManager =  new SocketManager().connect('http://localhost:8000') || null;
		this.party = "";
		this.video = null;
		this.role = "host"; // either host or viewer
		this.videoTimeInterval = null;

		this.videoStatus = null // either paused or playing
	}

	init() {
		if (this.role === "host") {
			
			this.video.addEventListener('pause', (e) => {
				// emit pause event
				this.videoStatus = "paused";
				this.SocketManager.emit('pause-video');
			})

			this.video.addEventListener('play', (e) => {
				// emit play event
				this.videoStatus = "playing";
				this.SocketManager.emit('play-video');
			})

			// setup an interval to emit time change event every second
			/*
			this.videoTimeInterval = setInterval(() => {
				// emit video time change event for socket.io
			}, 1000)
			*/
		} else {
			this.SocketManager.on('pause-video', () => {
				console.log("PAUSE EVENT RECEIVED FROM SOCKET");
				pauseVideo(this.video);
			})

			this.SocketManager.on('play-video', () => {
				console.log("PLAY EVENT RECEIVED FROM SOCKET");
				playVideo(this.video);
			})
		}
	}

	hostParty() {
		const video = document.querySelector(".html5-main-video");
		if (video == null) {
			alert("Please host party on YouTube video tab.")
		} else {
			this.video = video;
			this.videoStatus = video.playing ? "playing" : "paused"; // check if video is playing currently.
			this.party = "party#" + Math.floor(Math.random() * 100000);
			this.role = "host";

			// emit room name here with time data

		}

		this.init();
	}

	joinParty(party) {
		const video = document.querySelector(".html5-main-video");
		if (video == null) {
			alert("Please use join party on YouTube video tab.")
		} else {
			this.video = video;
			this.party = party;
			this.role = "viewer";
			// emit join room event
		}
		this.init();
	}

	endParty() {
		this.party = "";
		if (this.role === "host" && this.playInterval != null) {
			clearInterval(this.playInterval);
		}

		// emit end party event for socket.io
	}
}