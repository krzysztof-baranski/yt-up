import { urls } from './consts';

// Called when the user clicks on the browser action
console.log('!! ', Consts, chrome);

function doStaffWithDom (domContent) {
    console.warn('!! dommm', domContent, urls);
}

chrome.browserAction.onClicked.addListener(function(tab) {
    console.log('!! tab', tab);
    // Send a message to the active tab
    chrome.tabs.query({active: true, currentWindow:true},
        function(tabs) {
            console.log('!! tabs', tabs);
         var activeTab = tabs[0];
         chrome.tabs.sendMessage(activeTab.id, 
             {"message": "clicked_browser_action"}, 
             doStaffWithDom
         );
   });
});