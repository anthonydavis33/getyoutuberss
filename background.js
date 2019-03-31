// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]youtube.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?youtube\.com/;
var updatedUrl = "Nothing";

// On update, get new info.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if (urlRegex.test(tab.url)) {
		updatedUrl = tab.url;
	}
});


// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
	var message = {
		text: "url",
		tab: tab,
		url: updatedUrl
	};
		
	chrome.tabs.sendMessage(tab.id, message);
    
});