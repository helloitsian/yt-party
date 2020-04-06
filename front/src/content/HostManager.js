'use strict';

class HostManager extends PartyManager {
	constructor({ selector, url }) {
		super();
		this.role = "host";
		this.videoSelector = selector;
		this.handlePauseVideo = this.handlePauseVideo.bind(this);
		this.handlePlayVideo = this.handlePlayVideo.bind(this);
		this.hostParty = this.hostParty.bind(this);
		this.removeListeners = this.removeListeners.bind(this);
		this.party.videoUrl = url;

		
		this.SocketManager.connect("http://localhost:8000"); 
	}

	handlePauseVideo() {
		console.log("host paused video, emitting pause-video event");
		console.log(this.party.name);
		this.videoStatus = "paused";
		this.SocketManager.emit('pause-video', this.party.name);
	}

	handlePlayVideo() {
		console.log("host played video, emitting play-video event");
		console.log(this.party.name);
		this.videoStatus = "playing";
		this.SocketManager.emit('play-video', this.party.name);
	}

	handleUpdateVideoTime() {
		/* TODO */
	}

	initListeners() {
		// hook our listeners so we can socket emit when host takes an action
		this.video.addEventListener('pause', this.handlePauseVideo);
		this.video.addEventListener('play', this.handlePlayVideo);
	}

	removeListeners() {
		this.video.removeEventListener('pause', this.handlePauseVideo);
		this.video.removeEventListener('play', this.handlePlayVideo);
	}

	hostParty(cb) {
		console.log(cb)
		const video = document.querySelector(this.videoSelector);
		// emit room name here with time data

		// check if video is undefined or null
		if (video == null) {
			alert("Please host party on YouTube video tab.")
		} else {
			this.videoStatus = video.playing ? "playing" : "paused"; // check if video is playing currently.
			this.party.name = "party#" + Math.floor(Math.random() * 100000);
			this.video = video;

			this.SocketManager.emit("join-party", this.party, function(res) {
				this.party = res;
				cb(res)
			});

			// setup event listeners on this.video
			this.initListeners();
		}
	}

	endParty() {
		this.party = "";
		if (this.role === "host" && this.playInterval != null) {
			//clearInterval(this.playInterval);
			this.removeListeners();
			this.SocketManager.emit("leave-party", {
				party: this.party,
			})
		}

	}
}

