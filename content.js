
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?youtube\.com/;
var message = "Blank";
// On update, get new info.
 
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	
	if (msg.text === "url"){
		
		if (urlRegex.test(msg.url)) {
			for (var arrScripts = document.getElementsByTagName('script'), i = 0; i < arrScripts.length; i++) {
				if (arrScripts[i].textContent.indexOf('externalId') != -1) {
					var myRegexp = /("externalId"[\s\:]*")([\w-]*)("\,)/g;
					var channelId = myRegexp.exec(arrScripts[i].textContent)[2];
					var channelRss = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
				
					if(channelRss) {
						message = channelRss;
					}
					
				} else if (arrScripts[i].textContent.indexOf('playlistId') != -1) {
					var myRegexpPL = /("playlistId"[\s\:]*")([\w-]*)("\,)/g;
					var playlistId = myRegexpPL.exec(arrScripts[i].textContent)[2];
					var playlistRss = 'https://www.youtube.com/feeds/videos.xml?playlist_id=' + playlistId;
					
					if(playlistRss){
						message = playlistRss;
					}
				}
			}
		}

		console.log(message);
		message = '';
	}

});