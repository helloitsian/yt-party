'use strict';

describe("HostManager Class Tests", () => {
	

	describe("#hostParty", () => {
		let host;
		beforeAll((done) => {
			host = new HostManager({
				url: window.location.href,
				selector: ".host"
			});


			host.SocketManager.socket.on('connect', () => {
				host.hostParty((response) => {
					host.party = response;
					done()
				});
			})
		})
		it(".party.name should not be null and have length > 0", () => {
			expect(host.party.name).toBeDefined();
			expect(host.party.name).not.toBeNull();
			expect(host.party.name.length).toBeGreaterThan(0);
		});

		it("should create a new party and update party.host with host socket.id", () => {
			expect(host.party.host).toBeDefined();
			expect(host.party.host).not.toBeNull();
			expect(host.party.host.length).toBeGreaterThan(0);
		})
		afterAll(() => {
			host.SocketManager.disconnect();
			host.removeListeners();
			host = null;
		});
	})

	describe("#endParty", () => {
	})

	describe("#handlePauseVideo", () => {
		let host;
		beforeAll(() => {
			host = new HostManager({
				url: window.location.href,
				selector: ".host"
			});

			spyOn(host, 'handlePauseVideo').and.callThrough();
			
			host.hostParty((res) => {
				console.log(res)
			});
			
			spyOn(host.SocketManager.socket, 'emit').and.callThrough();
		});

		beforeEach((done) => {
			if (host.video.paused) {
				host.video.currentTime = 0;
				host.video.play().then(() => done())
			}
		})

		it("should call handlePauseVideo on video pause", (done) => {
			host.video.pause();
			setTimeout(() => {
				expect(host.videoStatus).toBe("paused");
				done()
			}, 1000);
		});

		it("should call socket emit with event type pause-video", (done) => {
			host.video.pause();
			setTimeout(() => {
				expect(host.SocketManager.socket.emit).toHaveBeenCalledWith('pause-video');
				done();
			}, 1000);
		});

		afterAll(() => {
			host.SocketManager.disconnect();
			host.removeListeners();
			host = null;
		});
	});

	describe("#handlePlayVideo", () => {
		let host;
		beforeAll((done) => {
			host = new HostManager({
				url: window.location.href,
				selector: ".host"
			});
			host.hostParty((res) => console.log(res));
			spyOn(host, 'handlePlayVideo').and.callThrough();
			spyOn(host.SocketManager.socket, 'emit').and.callThrough();

			done();
		});

		beforeEach(() => {
			if (!host.video.paused) {
				host.video.currentTime = 0;
				host.video.pause();
			}
		})

		it("should call handlePlayVideo on video play", async (done) => {
			host.video.play().then(() => { 
				expect(host.videoStatus).toBe("playing");
				done();
			});
		});

		it("should call socket emit with event type play-video", (done) => {
			host.video.play().then(() => {
				expect(host.SocketManager.socket.emit).toHaveBeenCalledWith('play-video');
				done();
			});
		});
		afterAll(() => {
			host.SocketManager.disconnect();
			host.removeListeners();
			host = null;
		});
	});
})
