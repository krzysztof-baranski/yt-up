function changeIcon (data) {
    if (!data) {
        console.log('[bacground doStaff] No data');
        return;
    }
    var tabId = data.tabId;
    var iconName = data.icon;
    console.log('[changeIcon]', tabId, iconName);

    if (tabId) {
        chrome.browserAction.setIcon({
            path: iconName,
            tabId: tabId
        });

        setTimeout(function () {
            chrome.browserAction.setIcon({
                path: 'green.png',
                tabId: tabId
            });
        }, 2000);

        alert('Paused?');
    }
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

function checkURL (url) {
    if (!url) {
        return;
    }

    return /.*:\/\/.*\.youtube\.com\/.*/.test(url);
}

chrome.tabs.onUpdated.addListener(function (tabId, changeInfo, tab) {
    // console.log('!! tab', tabId, changeInfo, tab);
    if (changeInfo.status !== 'complete' || !checkURL(tab.url)) {
        console.log('return', checkURL(tab.url));
        return;
    }
    console.log('run extension');
    chrome.browserAction.setIcon({
        path: 'green.png',
        tabId: tabId
    });
    
    chrome.tabs.sendMessage(tabId,
        { message: 'tab-updated', tabId: tabId },
        changeIcon
    );
});
