'use strict';


console.log("content script running");
chrome.runtime.onMessage.addListener((req, sender, res) => {
    console.log(req.message);
    res({ response: "content script received request" });

    return true;
});

/*
(function() { 
    console.log("content script has ran!")
    console.log("connected!", port); 
       port.onMessage.addListener((req, res) => {
            switch(req.event) {
                case 'START_PARTY': 
                    console.log('starting party'); 
                    res({ response: "party started" });
                    break;
                case 'GET_PARTY_DATA': 
                    console.log('sending party adta'); 
                    res({ response: "here is some party data" }); 
                    break;
                case 'END_PARTY': 
                    console.log('ending party'); 
                    res({ response: "ended party" }); 
                    break;
            }
            return true;
        });
})()
*/
