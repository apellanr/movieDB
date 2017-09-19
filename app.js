/*
MOVIEQUERY

TO DO LIST:
- Allow users to enter a search query in a field at the top of the page. X
- Use AJAX and an existing API (see below) to find movies matching the entered search term.
- List up to 20 movies as a responsive photo grid in neat columns and rows, showing:
    + The movie’s poster image (“poster_path” in the JSON) at 106 pixels wide each
    + The movie’s title beneath the poster image (“title” in the JSON)
- On desktop, the number of columns should grow to fill the full browser width if user resizes.
- On mobile, please only show a single column of movie posters and titles at all times.

Look up documentation of movieDB API - which queries to target
URL link: https://developers.themoviedb.org/3/search/search-movies


NOTES:
- using Postman to search through movie database API
    + // http://api.themoviedb.org/3/search/movie?api_key=51a0abce642402e7b8d43b2081302e77&query=Troll
- will need new search button when search has been completed

*/

$(document).ready(function(){
    handleEvents();
});

/* VARIABLES ------------------
----------------------------*/
var movieData = null,
    searchTotal = null,
    url = 'https://api.themoviedb.org/3/search/movie?query=',
    key = '&api_key=51a0abce642402e7b8d43b2081302e77'
    imgBasePath = 'http://image.tmdb.org/t/p/w154',
    noImgUrl = 'http://lnbnews.com/wp-content/uploads/2017/04/org_default.jpg';


/* EVENT LISTENERS --------------
----------------------------*/    
function handleEvents() {
    $(".search").on('click', function(){
        var input = $(".input").val();
        getMovieData(input);
    });
}

/* MOVIEDB CALL ----------------
----------------------------*/
function getMovieData(input) {
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": url + input + key,
        "method": "get",
      })
      .done(function(response) { // .success and .error were deprecated methods
          movieData = response.results;
          searchTotal = response.total_results;
          for(var i = 0; i < movieData.length; i++) { 
              // error handling for no found img
              if(movieData[i].poster_path === null) { // cond. to check if img cannot be found
                var moviePosterImg = noImgUrl; 
              } else {
                var posterPath = movieData[i].poster_path;
                var filmTitle = movieData[i].title; // noticed that film titles have misnomers comparing original_title prop.
                moviePosterImg = imgBasePath + posterPath;
              }
              createCardElements(moviePosterImg, filmTitle);
          }
          displayTotalResults(searchTotal);
    });
}

/* CARD CREATION FUNCTION --------
----------------------------*/
function createCardElements(img, title) {
    // Dom creation of card top
    var $div = $("<div>").addClass("col-sm-6 col-md-4 col-lg-3 mt-4");
    var $cardDiv = $("<div>").addClass("card");
    var $img = $("<img>").addClass("card-img-top").attr("src", img);

    // Dom creation of card block
    var $cardBlock = $("<div>").addClass("card-block");
    var $cardText = $("<p>").text(title);
    $cardBlock.append($cardText);
    $cardDiv.append($img, $cardBlock);

    // Append cardDiv to bootstrap grid div
    $div.append($cardDiv);
    displayMovieData($div);
}

/* DISPLAY TOTAL --------------
----------------------------*/
function displayTotalResults(total) {
    var $h3 = $("<h3>").addClass("total_results text-center").text("Total Movie Results: " + total);
    $(".results").append($h3);
}

/* DISPLAY TO DOM --------------
----------------------------*/
function displayMovieData(movieInfo) {
    $(".movie-cards").append(movieInfo);
}

/* RESET FUNCTION --------------
----------------------------*/
function newSearch() { // function to trigger new movie search
    
}