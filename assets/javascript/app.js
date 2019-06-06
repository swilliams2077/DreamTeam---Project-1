// capture click function
$("#search-submit").on('click', function (event) {
  console.log("clicked")
  event.preventDefault();
  var movie = $("#search-name-input").val();

  var queryURL = "https://www.omdbapi.com/?t=" + movie + "&type=&r=json&y=&plot=short&apikey=7cb1822e";
  var movRow = $("<div>");
  movRow.addClass("row");
  $.ajax({
    url: queryURL,
    method: "GET"
  }).then(function (response) {
    console.log(response);
    console.log(response.Runtime);
    console.log(response.Title);
    var movCol1 = $("<div>");
    movCol1.addClass("col-xs-3");
    var movCol2 = $("<div>");
    movCol2.addClass("col col-md-4");
    movRow.append(movCol1, movCol2);
    var titleCol = $("<div>");
    titleCol.addClass("TitleDiv");
    var RatingCol = $("<div>");
    RatingCol.addClass("star-outer");
    var starinner = $("<div>")
    starinner.addClass("star-inner");
    RatingCol.append(starinner);

    var PlotCol = $("<div>");
    PlotCol.addClass("SummaryDiv");
    movCol2.append(titleCol, RatingCol, PlotCol);
    titleCol.text("Title:" + response.Title);
    PlotCol.append("Summary:" + response.Plot + "<br>");
    movCol1.append("<img src='" + response.Poster + "'>");
    RatingCol.append("Rating:" + parseInt(response.imdbRating) + "<br>");
    

    ///start of calculating the rating
    const starTotal = 10;
    const ratings = response.imdbRating;

    if (ratings !== null) {
      
      var movie = $("#search-name-input").val();

      var queryURL = "https://www.omdbapi.com/?s=" + movie + "&type=&r=json&y=&plot=short&apikey=7cb1822e";
      $.ajax({
        url: queryURL,
        method: "GET"
      }).then(function (response) {
        console.log(response);
        var search = response.search;

        var movielist = $("#movieList")
        for (var m in response.Search) {
          var movie = response.Search[m];

          var li = $('<li class="list-group-item">');
          li.append(movie.Title);
          var posterimg = $("<img src='" + movie.Poster + "' width=100>");
          li.append(posterimg);
          movielist.append(li);
          console.log(movie)
        }

      });

    }

    $("#poster").append(movRow);
    const starPercentage = (ratings / starTotal) * 100;
    
    
    const starPercentageRounded = `${(Math.round(starPercentage / 10) * 10)}%`;
    

    console.log("WE'RE IN RATINGS")

    console.log($(".star-inner"));
    $(".star-inner").css("width", starPercentageRounded);
    console.log(starPercentageRounded);

    });
  $("#poster").html("")
});









