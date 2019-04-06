// Regex-pattern to check URLs against.
// It matches URLs like: http[s]://[...]youtube.com[...]
const URLREGEX = /^https?:\/\/(?:[^./?#]+\.)?youtube\.com/;
// On update, get new info.
chrome.tabs.onUpdated.addListener(function(tabId, changeInfo, tab) {
  if (URLREGEX.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, { text: "update", url: tab.url });
  }
  console.log(`UPDATE_URL: ${tab.url}`);
});

// When the browser-action button is clicked...
chrome.browserAction.onClicked.addListener(function(tab) {
  // ...check the URL of the active tab against our pattern and...
  if (URLREGEX.test(tab.url)) {
    chrome.tabs.sendMessage(tab.id, { text: "clicked", url: tab.url });
  }
});
