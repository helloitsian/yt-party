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
		this.videoStatus = "paused";
		pauseVideo(this.video);
	}

	handlePlayVideo() {
		this.videoStatus = "playing";
		playVideo(this.video);		
	}

	handleUpdateVideoTime(socketData) {
		setVideoTime(this.video, socketData.videoTime);
	}

	joinParty(partyId) {
		const video = document.querySelector(this.videoSelector);
		console.log(video)
		// check if video is null or undefined
		if (video == null) {
			alert("Please use join party on YouTube video tab.")
		} else {
			this.video = video;
			this.party.name = partyId;

            // emit join-party event to socket server
			this.SocketManager.emit('join-party', this.party.name, (res) => {
				this.party = res; // socket server will give us backend party info, we store it
				console.log(this.party)
			});

			this.SocketManager.on('pause-video', this.handlePauseVideo)

			this.SocketManager.on('play-video', this.handlePlayVideo)

			this.SocketManager.on('update-video-time', this.handleUpdateVideoTime)
		}
	}

	leaveParty() {
        this.SocketManager.emit('leave-party', this.party.name);
		this.SocketManager.disconnect(); 
        this.party = null; 
    }
}
