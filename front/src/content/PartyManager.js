'use strict';

class PartyManager {
	constructor() {
		this.SocketManager =  new SocketManager().connect('http://localhost:8000') || null;
		this.party = "";
	}

	joinParty(party) {

	}
}