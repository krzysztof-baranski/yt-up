function changeIcon(data) {
    if (!data) {
        console.log('[background: changeIcon]: No data');
        return;
    }

    var iconName = data;
    
    // set pause icon to active tab and then restore prev icon
    chrome.tabs.query({ active: true/* , currentWindow: true */ }, function (tabs) {
        var activeTab = tabs[0];
        chrome.browserAction.setIcon({tabId: activeTab.id, path: {
            '128': iconName
        }});

        setTimeout(function () {
            console.log('Set default icon (after timeout)');
           setDefaultIcon(activeTab);
        }, 2000);
    });
}

function setDefaultIcon(tab) {
    if (!tab) {
        return;
    }
    chrome.browserAction.setIcon({ tabId: tab.id, 
        path: checkURL(tab.url) ? 'yt-up-running.png' : 'yt-up-stopped.png',
        tabId: tab.id
    });
}

// chrome.browserAction.onClicked.addListener(function (tab) {
//     console.log('!! tab', tab);
//     // Send a message to the active tab
//     chrome.tabs.query({ active: true, currentWindow: true },
//         function (tabs) {
//             console.log('!! tabs', tabs);
//             var activeTab = tabs[0];
//             chrome.tabs.sendMessage(activeTab.id,
//                 { "message": "tab-updated", tabId: activeTab.id },
//                 doStaffWithDom
//             );
//         });
// });

function checkURL(url) {
    if (!url) {
        return;
    }

    return /.*:\/\/.*\.youtube\.com\/.*/.test(url);
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    if (changeInfo.status !== 'complete' || !checkURL(tab.url)) {
        return;
    }
    
    chrome.browserAction.setIcon({
        path: 'yt-up-running.png',
        tabId: tabId
    });

    chrome.runtime.onConnect.addListener(function (port) {
        port.onMessage.addListener(function (msg) {
            console.log('Background] msg', msg);
            if (msg && msg.icon) {
                changeIcon(msg.icon, tabId);
            }
        });
    });
});
