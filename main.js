var users = ["ESL_SC2", "OgamingSC2", "freecodecamp", "RobotCaleb", "brunofin", "comster404"];
var url = 'https://api.twitch.tv/kraken/';
var url404 = 'https://www.twitch.tv/';
var streams = 'streams/';
var channels = 'channels/';
var client = '?client_id=fbmc15tfetvvnnj1jp49l2baria5aw';
var defaultLogo = 'https://web-cdn.ttvnw.net/images/xarth/dead_glitch.png';
var stream;

$(document).ready(function() {
  users.forEach(function(user) {
    $.getJSON(url + channels + user + client, function(data) {
    $('.users').append('<a href="' + data.url + '"class="channel" id="' + user + '"><img class="logo" src="' + data.logo + '"><div class="name">' + user + '</div><div class="status"></div></a>');
    })
    .error(function() {
      // console.log("error");
      stream = "User does not exist";
      $('.users').append('<a href="' + url404 + user + '"class="channel" id="' + user + '"><img class="logo" src="' + defaultLogo + '"><div class="name">' + user + '</div><div class="status"><p>Channel does not exist</p></div></a>');
      $('.users a').attr('target', '_blank');
    });

    $.getJSON(url + streams + user + client, function(data) {
      if (data.stream === null) {
        stream = "Channel is offline";
      } else {
        stream = "Streaming:" + " " + data.stream.game;
      }
      $('#' + user).find(".status").html(stream);
    });
  });
});
