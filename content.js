var port = chrome.runtime.connect({ name: 'yt' });
port.postMessage({ message: 'Extension alive!' });
// port.onMessage.addListener(function (msg) {
console.log('[Content]');
// set up the mutation observer
var observer = new MutationObserver(function (mutations, me) {
    // `mutations` is an array of mutations that occurred
    // `me` is the MutationObserver instance
    var popupContainer = document.querySelectorAll('ytd-popup-container'); //to first watch
    if (popupContainer.length) {
        popupContainer = popupContainer[0];
        var paperDialog = popupContainer.querySelectorAll('paper-dialog'); // to second watch after first show
        if (paperDialog.length) {
            paperDialog = paperDialog[0];
            if (paperDialog.style.display !== 'none') {
                var paperButton = paperDialog.querySelectorAll('paper-button');
                if (paperButton.length) {
                    console.log('Paper Button click', paperButton[0]);
                    paperButton[0].click();
                    port.postMessage({ icon: 'yt-up-paused.png' });
                    return;
                }
            }
        }
    }
});

// start observing
observer.observe(document, {
    attributes: true,
    childList: true,
    characterData: true,
    attributeOldValue: true,
    subtree: true
});
