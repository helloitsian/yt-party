const BACKGROUND = "BACKGROUND";
const CONTENT_SCRIPT = "CONTENT_SCRIPT";
const POPUP_PANEL = "POPUP_PANEL";

const dispatch = (activeTab, routed, res) => {
    if (routed.to === "CONTENT_SCRIPT") {         
        chrome.tabs.sendMessage(activeTab, routed, res);
    }
    else 
        chrome.runtime.sendMessage(router, null, res);
}

const sendMessage = (req, res) => {
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        dispatch(tabs[0].id, req, res);
    });
}

const router = (req) => { 
    const relay = {
        from: BACKGROUND,
        to: "",
        body: req.body,
    }

    switch(req.from) {
        case CONTENT_SCRIPT: 
            relay.to = POPUP_PANEL;
            break;
        case POPUP_PANEL:
            relay.to = CONTENT_SCRIPT;
            break;
    }

   return(relay);
}


chrome.runtime.onMessage.addListener((req, sender, res) => {
    const routed = router(req); 
    sendMessage(routed, res);
    return true;
});
