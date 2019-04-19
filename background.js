var clickHandler = function(info){
    let url =  info.linkUrl.split("://")[1];
    var encodedYtUrl = encodeURIComponent(url);
    var finalUrl = "https://chordify.net/search/www.youtube.com/" + encodedYtUrl + "?from=chordifyme";
    chrome.tabs.create({url: finalUrl});
};
var menuItem = {
    id:"chordifyTheSong",
    title: "Chordify this song",
    contexts: ["link"],
    targetUrlPatterns: ["*://*.youtube.com/watch*"],
    onclick: clickHandler
};

chrome.contextMenus.create(menuItem);

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    if (tab.url.indexOf('youtube.com/watch') != -1){
        chrome.pageAction.show(tabId);
    } else {
        chrome.pageAction.hide(tabId);
    }
    if (tab.url.indexOf('chordify.net/search') != -1 && tab.url.indexOf('?from=chordifyme') != -1 && changeInfo.status == 'complete') {
        chrome.tabs.executeScript(null, { 
            file: "clickSearchResult.js"
        });
    }
});
