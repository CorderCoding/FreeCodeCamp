$(function() {

  if ($(window).width() < 768) {
    $(".jumbotron").parent().removeClass("affix");
  }
  
  function searchWiki(search) {
    $("#results").text("");
    
    var wikiRequestTimeout = setTimeout(function() {
      $wikiElem.text("Failed to get Wikipedia resources.");
    }, 8000);

    $.ajax({
      url: "https://en.wikipedia.org/w/api.php?format=json&action=opensearch&limit=500&search=" + search,
      dataType: "jsonp",
      success: function(n) {
        for(var i = 0; i < n[1].length; i++) {
          $("#results").append('<li class="well" style="display:none"><a href="' + n[3][i] + '" target="_blank">' + n[1][i] + '</a><p>' + n[2][i] + '</p></li>');
        }
        $("#results li").each(function(n) {
          $(this).delay(75 * n).show("slide", {direction: "right"}, "fast");
        })
        clearTimeout(wikiRequestTimeout);
      }
    });
  }
    
  $("#search-button").on("click", function() {
    var search = $("#search").val();
    searchWiki(search);
  });
  $("#search").on("input", function(n) {
    var search= $("#search").val();
    searchWiki(search);
  });
});