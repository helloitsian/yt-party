'use strict';

/* refer to https://stackoverflow.com/questions/15509231/unit-testing-node-js-and-websockets-socket-io for socket.io unit testing */

describe("SocketManager Tests", () => {
	const SOCKET_URL = "http://localhost:8000";

	describe("#connect", () => {
		let manager;

		beforeEach((done) => {
			manager = new SocketManager();
			done();
		});
		it("Should be connected to socket.io host", (done) => {
			manager.connect(SOCKET_URL);
			manager.socket.on('connect', () => {
				expect(manager.socket.connected).toBeTruthy();
				done();
			});
		});
	});

	describe("#disconnect", () => {
		let manager;

		beforeEach((done) => {
			manager = new SocketManager().connect(SOCKET_URL);
			done();
		});
		it("Should disconnect from socket.io host", () => {
			manager.disconnect();
			expect(manager.socket.connected).toBe(false);
		});
	});
	
	describe("#emit", () => {
		let manager;
		beforeEach(() => {
			manager = new SocketManager().connect(SOCKET_URL);
			spyOn(manager.socket, 'emit').and.callThrough();
		});

		it("will call socket.emit with correct arguments", () => {
			// call manager commit
			manager.emit("event", "correct args!");
			// we exepct our manager commit to call socket.emit as well.
			expect(manager.socket.emit).toHaveBeenCalledWith("event", "correct args!");
		});
	});

	describe("#on", () => {
		let manager;
		let mock = {};
		beforeEach(async () => {
			manager = new SocketManager().connect(SOCKET_URL);

			mock.toSpyOn = () => { } // dummy function

			spyOn(mock, 'toSpyOn'); // spy on dummy function
		})

		it("Should emit toSpyOn on event", (done) => {
			// asign toSpyOn dummy method to connect event
			manager.on("dev-test", () => {
				console.log("test")
				mock.toSpyOn();

				expect(mock.toSpyOn).toHaveBeenCalled();
				done();
			});
			
			manager.socket.emit("dev-test");
		});
	});	


});