chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log('aa r', request);
      if( request.message === "clicked_browser_action") {
        unpause(sendResponse);
      }
   }
);

function unpause(/* sendResponse */){
    console.log('Toggle', document.getElementsByClassName('-logo js-gps-track')[0].click());
    // sendResponse();
}