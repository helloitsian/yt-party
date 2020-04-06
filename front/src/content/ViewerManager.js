'use strict';

class ViewerManager extends PartyManager {
	constructor({ url, selector}) {
		super();
		this.role = "viewer";

		this.handlePauseVideo = this.handlePauseVideo.bind(this);
		this.handlePlayVideo = this.handlePlayVideo.bind(this);
		this.joinParty = this.joinParty.bind(this);
		this.videoSelector = selector;
		this.SocketManager.connect("http://localhost:8000");
	}

	handlePauseVideo() {
		console.log("PAUSE EVENT RECEIVED FROM SOCKET");
		this.videoStatus = "paused";
		pauseVideo(this.video);
	}

	handlePlayVideo() {
		console.log("PLAY EVENT RECEIVED FROM SOCKET");
		this.videoStatus = "playing";
		playVideo(this.video);		
	}

	handleUpdateVideoTime() {
		/* TODO */		
	}

	joinParty(partyId) {
		const video = document.querySelector(this.videoSelector);
		console.log(video)
		// check if video is null or undefined
		if (video == null) {
			alert("Please use join party on YouTube video tab.")
		} else {
			// emit join room event TODO

			this.video = video;
			this.party.name = partyId;

			this.SocketManager.emit('join-party', this.party.name, (res) => {
				this.party = res;
				console.log(this.party)
			});

			this.SocketManager.on('pause-video', this.handlePauseVideo)

			this.SocketManager.on('play-video', this.handlePlayVideo)

			this.SocketManager.on('update-video-time', this.handleUpdateVideoTime)
		}
	}

	leaveParty() {
		this.party = null;
		this.SocketManager.disconnect(); 
		// emit leave room event TODO
	}
}