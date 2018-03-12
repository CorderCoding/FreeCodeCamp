$(function() {

  //Function to get new quote from specified URL
  function getQuote() {
    $.getJSON("https://api.forismatic.com/api/1.0/?method=getQuote&lang=en&format=jsonp&jsonp=?", function(n) {
      $("#quote").text('"' + n.quoteText + '"');
      $("#author").text("- " + n.quoteAuthor);
    });
  }

  //Call getQuote upon page loading
  getQuote();

  //Call getQuote when next-button is clicked
  $("#next-button").on("click", function(n) {
    getQuote();
  });

  //Tweet quote when button clicked
  $("#tweet-button").on("click", function() {
    var q = $("#quote").text();
    var a = $("#author").text();
    $("#tweet-button").attr("href", "https://twitter.com/intent/tweet?text=" + encodeURIComponent(q + " " + a));
  });
});