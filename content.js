const REGEXES = {
  urlregex: /^https?:\/\/(?:[^./?#]+\.)?youtube\.com\/user/,
  playlistregex: /^https?:\/\/(?:[^./?#]+\.)?youtube\.com\/playlist/
};

chrome.runtime.onMessage.addListener(function(msg, sender, sendResponse) {
  if (msg.text === "update") {
    //console.log(msg.url);
    if (REGEXES.urlregex.test(msg.url)) {
      let channelName = msg.url.split("user/")[1];
      let urltype =
        channelName.indexOf("/") != -1
          ? channelName.split("/")[1].replace("/", "")
          : "channel";

      if (channelName.indexOf("/playlist") != -1) {
        let listID = channelName.split("?list=")[1];
        console.log(listID);
      } else {
        let channelURL = `https://www.youtube.com/feeds/videos.xml?channel_id=${getChannelId(
          channelName
        )}`;
        if (channelURL) {
          console.log(`CHANNEL_RSS: ${channelURL}`);
        }
      }
    } else if (REGEXES.playlistregex.test(msg.url)) {
      let listID = msg.url.split("?list=")[1],
        playlistUrl = `https://www.youtube.com/feeds/videos.xml?playlist_id=${listID}`;
      console.log(`PLAYLIST_RSS: ${playlistUrl}`);
    }
  }

  if (msg.text === "clicked") {
    console.log("click :)");
  }
});

function getChannelId(channelName) {
  const API_KEY = "AIzaSyDLpz8HBcA8bW1MDeo50nLdi4ZURgTWoT4";
  var xhr = new XMLHttpRequest();

  xhr.open(
    "GET",
    `https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&type=channel&part=snippet&q=${channelName}&fields=items%2Fsnippet%2FchannelId`,
    true
  );

  xhr.onload = function(e) {
    if (xhr.readyState === 4) {
      if (xhr.status === 200) {
        var result = JSON.parse(xhr.responseText);
        if (result.items) {
          return result.items[0].snippet.channelId;
        }
      } else {
        console.error(xhr.statusText);
      }
    }
  };
  xhr.send(null);
}

function getURLs(script) {
  if (script.textContent.indexOf("externalId") != -1) {
    let vanityChannelUrl = REGEXES.vanityregex.exec(script.textContent)[2];
    let channelId = REGEXES.channelregex.exec(script.textContent)[2];
    console.log(script.textContent);
    return `https://www.youtube.com/feeds/videos.xml?channel_id=${channelId}`;
  } else if (script.textContent.indexOf("playlistId") != -1) {
    let playlistId = REGEXES.playlistregex.exec(script.textContent)[2];
    console.log(script.textContent);
    return `https://www.youtube.com/feeds/videos.xml?playlist_id=${playlistId}`;
  }
}
