// Regex-pattern to check URLs against. 
// It matches URLs like: http[s]://[...]youtube.com[...]
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?youtube\.com/;
var message = {
		text: "blank"
	};

// On update, get new info.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {

	if (urlRegex.test(tab.url)) {
		message.text = "update";
		message.url = tab.url;

		chrome.tabs.sendMessage(tab.id, message);
	}

	

});


// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function (tab) {
    // ...check the URL of the active tab against our pattern and...
	if (urlRegex.test(tab.url)) {
		message.text = "clicked";
		message.url = tab.url;

		chrome.tabs.sendMessage(tab.id, message);
	}
		
	
    
});