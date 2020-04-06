"use strict";

describe("ViewerManager Tests", () => {
	/*
	describe("#joinParty", () => {

	})
	*/

	describe("#handlePauseVideo", () => {
		let host, viewer;
		beforeAll((done) => {
			host = new HostManager({
				url: window.location.href,
				selector: ".host"
			});
			viewer = new ViewerManager({
				url: window.location.href,
				selector: ".viewer"
			});

			host.hostParty((res) => console.log(res)); // setup a new party
			viewer.joinParty(host.party); // join new party

			// we wait for 1 second before 
			setTimeout(() => {
				done(); 
			}, 1000)
		});

		beofreEach(() => {
			pauseVideo(viewer.video);
		})

		it("should set viewer video status to paused on pause-video emit", () => {
			host.SocketManager.emit("pause-video", host.party.name);
			expect(viewer.videoStatus).toBe("paused");
		});
		
		it("should pause viewer video on pause-video io emit", () => {
			host.SocketManager.emit("pause-video", host.party.name);
			expect(viewer.video.paused).toBeTruthy();
		});
	})
	
	describe("#handlePlayVideo", () => {
		let host, viewer;
		beforeAll((done) => {
			host = new HostManager({
				url: window.location.href,
				selector: ".host"
			});
			viewer = new ViewerManager({
				url: window.location.href,
				selector: ".viewer"
			});

			host.hostParty((res) => console.log(res)); // setup a new party
			viewer.joinParty(host.party.name); // join new party
			

			// we wait for 1 second before 
			setTimeout(() => {
				done(); 
			}, 1000)
		});

		it("should set viewer video status to paused on pause-video emit", () => {
			host.SocketManager.emit("play-video", host.party.name);
			expect(viewer.videoStatus).toBe("playing");
		});

		it("should set viewer video status to playing", () => {
			host.SocketManager.emit("play-video", host.party.name);
			expect(viewer.video.paused).toBeFalsy();
		});
	})
	
})