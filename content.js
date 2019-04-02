
var urlRegex = /^https?:\/\/(?:[^./?#]+\.)?youtube\.com/;
var message = "Blank";
// On update, get new info.
 
chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
	
	if (msg.text === "update"){
		//console.log(msg.url);
		if (urlRegex.test(msg.url)) {
			for (var arrScripts = document.getElementsByTagName('script'), i = 0; i < arrScripts.length; i++) {
				//console.log(arrScripts);
				if (arrScripts[i].textContent.indexOf('externalId') != -1) {

					var myRegexpUrl = /("vanityChannelUrl"[\s\:]*")(((http[s]?):\/)?\/?([^:\/\s]+)((\/\w+)*\/)([\w\-\.]+[^#?}\s]+))/g;
					var vanityChannelUrl = myRegexpUrl.exec(arrScripts[i].textContent)[2];
					console.log(vanityChannelUrl);

					var myRegexpChan = /("externalId"[\s\:]*")([\w-]*)("\,)/g;
					var channelId = myRegexpChan.exec(arrScripts[i].textContent)[2];
					var channelRss = 'https://www.youtube.com/feeds/videos.xml?channel_id=' + channelId;
				
					if(channelRss) {
						message = channelRss;
						//console.log(message);
					}
					
				} else if (arrScripts[i].textContent.indexOf('playlistId') != -1) {
					var myRegexpPL = /("playlistId"[\s\:]*")([\w-]*)("\,)/g;
					var playlistId = myRegexpPL.exec(arrScripts[i].textContent)[2];
					var playlistRss = 'https://www.youtube.com/feeds/videos.xml?playlist_id=' + playlistId;
					
					if(playlistRss){
						message = playlistRss;
						//console.log(message);
					}
				}
			}
		}
	}

	if (msg.text === "clicked"){

		console.log(message);
	}

});