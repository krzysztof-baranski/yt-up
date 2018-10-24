chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
      console.log('aa r', request);
      if( request.message === "clicked_browser_action") {
        unpause(sendResponse);
      }
   }
);

function unpause(/* sendResponse */){
    var el = document.querySelectorAll('yt-button-renderer #button.yt-button-renderer');

    console.log('Toggle', el);
    // sendResponse();
}