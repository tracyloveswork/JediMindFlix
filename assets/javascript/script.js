// Variables
var yodaSummary = "";
var summary = "";
var title ="";

// Whent title is submitted
$("#check-movie").on("click", function(event) {
  event.preventDefault();

  $('#default_screen').remove();

  // Clear last message
  $("#netflix").empty();
  $("#ratingDisplay").empty();


  // This line grabs the input from the textbox
  title = $("#title-input").val().trim();

  // Run netflix API
  var queryURLtitle = "https://community-netflix-roulette.p.mashape.com/api.php?title=" + title;

  var key = "bh5PH4M5r6mshqeGupreXyWUwOCzp1gPcqajsnF7sxA3FjgZkO";

  $.ajax({
    url: queryURLtitle,
    headers: {
    "X-Mashape-Key": key,
    "Accept": "application/json"
    },
    method: "GET"
  }).done(function(response) {
    console.log(response);

  // Storing the title
  var showTitle = response.show_title;
  var netflixRating = response.rating;

  // Creating an element to hold the title
  var printTitle = $("<h3>").text("Watch " + showTitle + " on Netflix, you can. Hmmm.");
  var printRating = $("<p>").text("Netflix rating: " + netflixRating);

  // Appending the title
  $("#netflix").append(printTitle);
  $("#ratingDisplay").append(printRating);

  // Storing the summary
  summary = response.summary;

  // Run Yoda Speak API >> Send resulting summary to yoda.
  var queryURLyoda = "https://yoda.p.mashape.com/yoda?sentence=" + summary;

    $.ajax({
      url: queryURLyoda,
      headers: {
      "X-Mashape-Key": key,
      "Accept": "text/plain"
      },
      method: "GET"
    }).done(function(response) {
      console.log(response);

      // Creating an element to hold the yodaSummary
      var printSummary = $("<p>").text(response);

      // Appending the summary
      $("#netflix").append(printSummary);
      
      }).fail(function(){
      yodaSummary = summary;
      });
      // End of yoda ajax call

    // Run www.omdbapi.com API to pull in ratings
    var ratingQueryURL = "https://www.omdbapi.com/?t=" + title + "&y=&plot=short&apikey=40e9cece";
    console.log(ratingQueryURL);
    $.ajax({
      url: ratingQueryURL,
      method: "GET"
    }).done(function(response) {
      console.log(response.Ratings);

      // Check length of rating array
      for (i=0;i<response.Ratings.length;i++) {

        // Check to see if one of them is a Netflix rating... Do not use Netflix
        if (response.Ratings[i].Source == "Netflix") {

        console.log("There is already a Neflix rating.");

      } else {

        var addRating = $("<p>").text(response.Ratings[i].Source + ": " + response.Ratings[i].Value);
        $("#ratingDisplay").append(addRating);

          }
        }
      });
    // End movie rating loop

    // Clear input field
    title = $("#title-input").val("");
        
    }).fail(function(){

      // Creating an error message
      var printError = $("<h3>").text("Watch this on Netflix, you cannot.");

      // Appending the title
      $("#netflix").append(printError);

      // Clear input field
      title = $("#title-input").val("");

      });
      // End of Netfix Roulette ajax call
  });
  // End of button on function

     