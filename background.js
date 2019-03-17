var newUrl;
var newTabId;

chrome.browserAction.onClicked.addListener(function(activeTab) {
    // let activeTab = tabs[0];
    openNewTab(activeTab);
})

chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
    let script = 'alert("' + changeInfo.status + ');';
    if (tab.url.indexOf(newUrl) != -1 || true) {
        chrome.tabs.executeScript(null, {code: script})
    }
})

function openNewTab(activeTab) {
    alert('icon clicked');
    console.log(activeTab.url);
    chrome.tabs.executeScript(activeTab.id, {code:"console.log('Testing background scripts...');"});
    let url =  activeTab.url.split("://")[1];
    var encodedYtUrl = encodeURIComponent(url);
    // document.getElementById("message").textContent = encodedUrl;
    var finalUrl = "https://chordify.net/search/www.youtube.com/" + encodedYtUrl;
    newUrl = finalUrl;
    //var win = window.open(finalUrl, "_blank");
    chrome.tabs.create({url: finalUrl, active: false}, function(tab) {
        newTabId = tab.id;
        setTimeout(checkPageLoaded, 1000, tab.id);
    });
    chrome.tabs.executeScript(activeTab.id, {code:"console.log('New tab id is " + newTabId +"');"});
    chrome.tabs.executeScript({
        // file: "clickSearchResult.js"
        code: "console.log('Testing testing...');"
    }, function(results){
        //alert(results);
    });
}

 function checkPageLoaded(tabid) {
    
    chrome.tabs.query({id: tabid }, function (tab) {
        console.log("Query returned " + tab.length + " results.")
        for(var i = 0; i < tab.length; i++){ 
            console.log(tab[i]);
            // if(tab[i].title =! undefined) {
            //     chrome.tabs.executeScript(tab[i].id, {code:'console.log("Hey!!");'});
            // }
            // else{
            //     setTimeout(checkPageLoaded, 1000) 
            // }
        }
    });
 }