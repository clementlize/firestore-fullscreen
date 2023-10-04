chrome.runtime.onMessage.addListener(async (request, sender, sendResponse) => {

    let queryOptions = { active: true, lastFocusedWindow: true };
    let [currentTab] = await chrome.tabs.query(queryOptions);
    console.info("current tab", currentTab);

    sendResponse(currentTab)
      
    console.log(sender.tab ?
                  "from a content script:" + sender.tab.url :
                  "from the extension");
      if (request.greeting === "hello")
        sendResponse({farewell: "goodbye"});
    }
);