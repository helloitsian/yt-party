'use strict';

console.log("content script running");

function reduceMessage(req, res) {

    switch(req.body) {
        case "START_PARTY": injectClient();
            res({ response: "starting party" });
        break;
    }
}


chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log(req.body);
    res({ response: "content script received request" });
   
    reduceMessage(req, res);


    return true;
});


