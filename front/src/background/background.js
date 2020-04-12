chrome.runtime.onMessage.addListener((req, sender, res) => {

    if (req.from === "popupPanel")
        chrome.tabs.sendMessage(req.tab, { from: "background", message: req.message, res }); // from popup script
    else
        chrome.runtime.sendMessage({ from: "background", message: req.message, res }); // from content_script

    return true;
});
