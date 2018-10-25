chrome.runtime.onMessage.addListener(
    function (request, sender, sendResponse) {
        console.log('aa r', request, sender, sendResponse);
        if (request.message === "tab-updated") {
            // set up the mutation observer
            var observer = new MutationObserver(function (mutations, me) {
                // `mutations` is an array of mutations that occurred
                // `me` is the MutationObserver instance
                var divMain;
                divMain = document.querySelectorAll('div#main.style-scope.yt-confirm-dialog-renderer');
                console.log('@@@ Observer ', divMain);
                if (divMain.length) {
                    btn = divMain[0].querySelectorAll('paper-button');
                    if (btn.length) {
                        btn[0].click();
                        sendResponse({ tabId: tabId, icon: 'paused.png' });
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
