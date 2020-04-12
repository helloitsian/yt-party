'use strict';

const tabQuery = { active: true, currentWindow: true };
    const dispatch = (event, cb) => {
        chrome.tabs.query(tabQuery, (tabs) => { 
            chrome.runtime.sendMessage({
                from: "popupPanel",
                tab: tabs[0].id, 
                message: "message from popup",
            }, null, cb);
        });
    }



const startParty = (cb) => dispatch("START_PARTY", cb);
const getPartyData = (cb) => dispatch("GET_PARTY_DATA", cb);
const endPartyData = (cb) => dispatch("END_PARTY", cb);

const startPartyButton = document.querySelector(".app-start-party");
const joinPartyButton = document.querySelector(".app-join-party");

function handleStartParty(e) {
    console.log("client starting party");
    startParty((data) => alert(data.response))
}

function handleJoinParty(e) {
    console.log("client joining party")
    const partyId = "party-id";
    //1chromitter.dispatch('join-party', { partyId )
}

startPartyButton.addEventListener("click", handleStartParty);
joinPartyButton.addEventListener("click", handleJoinParty);
