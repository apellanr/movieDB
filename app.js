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
- will need new search button when search has been completed


*/

$(document).ready(function(){
    console.log('app loaded');
    handleEvents();
});

var movieData = null,
    url = 'https://api.themoviedb.org/3/search/movie?query=',
    key = '&api_key=51a0abce642402e7b8d43b2081302e77'
    imgBasePath = 'http://image.tmdb.org/t/p/w154',
    noImgUrl = 'http://lnbnews.com/wp-content/uploads/2017/04/org_default.jpg';

function handleEvents() {
    $(".search").on('click', function(){
        console.log('submit clicked');
        var input = $(".input").val();
        getMovieData(input);
    });
}

/* --------------------------
MOVIEDB CALL
----------------------------*/
function getMovieData(input) {
    console.log('calling moviedb');
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": url + input + key,
        "method": "get",
      })
      .done(function(response){
          movieData = response.results;
          console.log(movieData);

          for(var i = 0; i < movieData.length; i++) {
              if(movieData.poster_path === null) {
                var moviePosterImg = noImgUrl;
                console.log(noImgUrl);
              } else {
                var posterPath = movieData[i].poster_path;
                var filmTitle = movieData[i].title;
                moviePosterImg = imgBasePath + posterPath;
              }
              
            //   console.log(moviePosterImg, filmTitle);
              createCardElements(moviePosterImg, filmTitle);
          }
          
    });
}

function createCardElements(img, title) {
    // Dom creation of card top
    var $div = $("<div>").addClass("col-sm-6 col-md-4 col-lg-3 mt-4");
    var $cardDiv = $("<div>").addClass("card");
    var $img = $("<img>").addClass("card-img-top").attr("src", img);
    $cardDiv.append($img);

    // Dom creation of card block
    var $cardBlock = $("<div>").addClass("card-block");
    var $cardText = $("<p>").text(title);
    $cardBlock.append($cardText);

    // Append to card-row div in html page
    $div.append($cardDiv, $cardBlock);
    displayData($div);
}

function displayData(movieInfo) {
    $(".card-row").append(movieInfo);
}



// TEST API in postman
// http://api.themoviedb.org/3/search/movie?api_key=51a0abce642402e7b8d43b2081302e77&query=Troll

