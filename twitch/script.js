
var inputChannels = ["kittyplays", "sonyatheevil", "shayed_", "dorirodo", "zensible", "yuuie", "cyborgangel", "legendarylea", "loserfruit", "freecodecamp"];
var channelData = [];
var channelStatus = [];

var channels = [];


getChannelInfo();



function getChannelInfo(){
    for (x = 0; x < inputChannels.length; x++){
        var newChannel = {};
        channels[x] = newChannel;
        getChannelData(inputChannels[x], x);
        getChannelStatus(inputChannels[x], x);
    }
    setTimeout(function(){
        parseAllChannels();
    }, 1100);
}

function parseAllChannels(){
    for (x = 0; x < channels.length; x++){
        var channel = channels[x];
        console.log(channel.name + ", " + channel.logo + ", " + channel.statusDisplay);
        makeChannelHTML(channel);
    }
}

function makeChannelHTML(channel){
    var html = '<a href = "' + channel.url + '" target = "_blank">' +
    '<div class = "streamer ' + channel.statusClass + '">' +
    '<img class ="streamerIcon" src = "' + channel.logo + '">' +
    '<div class = "streamerTitle">' + channel.name + '</div>' +
    '<div class = "streamerStatus">' + channel.statusDisplay + '</div></div></a>';
    var container = document.getElementById("container");
    container.innerHTML += html;
}

function getChannelData(input, channelIndex){
    $.ajax({
    url: "https://wind-bow.gomix.me/twitch-api/channels/" + input + "?callback=?",
    dataType: "jsonp",
    data: {
        format: "jsonp"
    },
    success: function(data){
      channel = channels[channelIndex];
      channel.name = data.display_name,
      channel.logo = data.logo,
      channel.url = data.url
    },
    error: function(){
      console.log("Error: Could not get channel data for " + input);
    }
  })
}

function getChannelStatus(input, channelIndex){
    $.ajax({
    url: "https://wind-bow.gomix.me/twitch-api/streams/" + input + "?callback=?",
    dataType: "jsonp",
    data: {
        format: "jsonp"
    },
    success: function(data){
        channel = channels[channelIndex];
        if (data.stream == null){
            channel.statusClass = "statusOffline";
            channel.statusDisplay = "Offline";
        }
        else{
            channel.statusClass = "statusOnline";
            channel.statusDisplay = data.stream.game;
        }       
    },
    error: function(){
        console.log("Error: Could not get channel status for " + input);
    }
  })
}

