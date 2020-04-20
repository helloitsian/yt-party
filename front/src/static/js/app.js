'use strict';

const dispatch = (event, cb) => {
    chrome.runtime.sendMessage({
        to: "BACKGROUND",
        from: "POPUP_PANEL",
        body: event,
    }, null, cb);
}


const startParty = (cb) => dispatch("START_PARTY", cb);
const endParty = (cb) => dispatch("END_PARTY", cb);

const startPartyButton = document.querySelector(".app-start-party");
const joinPartyButton = document.querySelector(".app-join-party");
const view = document.querySelector("#view-wrap");

const partyState = {
    inParty: false,
    partyId: "",
}

function handleStartParty(e) {
    console.log("client starting party");

    startParty((res) => console.log(res));
}

function handleJoinParty(e) {
    console.log("client joining party")
    const partyId = "party-id";
}

startPartyButton.addEventListener("click", handleStartParty);
joinPartyButton.addEventListener("click", handleJoinParty);
