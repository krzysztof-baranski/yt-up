chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('aa r', request, sender, sendResponse);
        if (request.message === "tab-updated") {
            // set up the mutation observer
            var observer = new MutationObserver(function (mutations, me) {
                // `mutations` is an array of mutations that occurred
                // `me` is the MutationObserver instance
                var divMain;
                divMain = document.querySelectorAll('paper-dialog');
                if (divMain.length) {
                    btn = divMain[0].querySelectorAll('confirm-button');
                    if (btn.length) {
                        console.log('@@@ Observer ', btn);
                        
                        // btn[0].click();
                        sendResponse({ tabId: request.tabId, icon: 'paused.png' });
                        // me.disconnect(); // stop observing
                        return;
                    }
                }
            });

            // start observing
            observer.observe(document, {
                childList: true,
                subtree: true
            });
        }
        return true;
    }
);
