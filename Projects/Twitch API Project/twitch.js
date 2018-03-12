$(function() {
  var users = ["Proto_1522", "Proto1522"];

  $.ajax({
    url: "https://api.twitch.tv/kraken/users/proto1522/follows/channels?limit=100&client_id=r2dv1cse52erg5ahhab7dxqa6c86qb",
    async: false,
    success: function(data) {
      for (var i in data.follows) {
        users.push(data.follows[i].channel.name);
      }
    }
  });
  function getChannel(channel) {
    var name = "";
    var displayName = "";
    var logoSrc = "";
    var url = "";
    var status = "";
    var title = "";
    var game = "";
    var msg = "";

    $.ajax({
      url: "https://api.twitch.tv/kraken/channels/" +
        channel +
        "?client_id=r2dv1cse52erg5ahhab7dxqa6c86qb",
      success: function(data) {
        name = data.name;
        displayName = data.display_name;
        logoSrc = data.logo;
        url = data.url;
        title = data.status;
        game = data.game;
        msg = data.message;

        $.getJSON(
          "https://api.twitch.tv/kraken/streams/" +
            channel +
            "?client_id=r2dv1cse52erg5ahhab7dxqa6c86qb",
          function(data) {
            if (data.stream == null) {
              status = "offline";
            } else {
              status = "online";
            }
            if (logoSrc == null) {
              $("#users").append(
                "<a href=" +
                  url +
                  " target='_blank'><li id=" +
                  name +
                  " class='list-group-item " +
                  status +
                  "'>" +
                  displayName +
                  "</li></a>"
              );
            } else {
              $("#users").append(
                "<a href=" +
                  url +
                  " target='_blank'><li id=" +
                  name +
                  " class='list-group-item " +
                  status +
                  "'><img class='img-rounded' src=" +
                  logoSrc +
                  "> " +
                  displayName +
                  "</li></a>"
              );
            }
            if (status == "online") {
              $("#" + name).parent().appendTo("#users-online");
              $("#" + name).append(" - " + game + " - " + title);
              $("#" + name).addClass("list-group-item-success");
            } else {
              $("#" + name).parent().appendTo("#users-offline");
              $("#" + name).addClass("list-group-item-danger");
            }
          }
        );
      },
      error: function(data) {
        $("#users").append(
          "<li id=" +
            channel +
            " class='not-found list-group-item list-group-item-info'>" +
            channel +
            " cannot be found.</li>"
        );
        $("#" + channel).appendTo("#users-not-found");
      }
    });
  }
  for (var i in users) {
    getChannel(users[i]);
  }
  
  $("#online").on("click", function() {
    $(".online").show();
    $(".offline").hide();
    $(".not-found").hide();
  });

  $("#offline").on("click", function() {
    $(".online").hide();
    $(".offline").show();
    $(".not-found").hide();
  });

  $("#all").on("click", function() {
    $(".online").show();
    $(".offline").show();
    $(".not-found").show();
  });

  $("#clear").on("click", function() {
    $("#users-online").empty();
    $("#users-offline").empty();
    $("#users-not-found").empty();
  });

  $("#add").on("click", function() {
    if (/\W/gi.test($("#add-input").val()) == false) {
      getChannel($("#add-input").val());
      $("#add-input").val("");
    }
  });

  $("#add-input").on("keypress", function(i) {
    if (i.keyCode == 13) {
      if (/\W/gi.test($("#add-input").val()) == false) {
        getChannel($("#add-input").val());
        $("#add-input").val("");
      }
    }
  });
});
