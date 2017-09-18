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

function handleEvents() {
    $(".search").on('click', function(){
        console.log('submit clicked');
        getMovieData();
    })
}

function getMovieData() {
    console.log('calling moviedb');
      $.ajax({
        "async": true,
        "crossDomain": true,
        "url": "https://api.themoviedb.org/3/search/movie?include_adult=false&page=1&query=Troll&language=en-US&api_key=51a0abce642402e7b8d43b2081302e77",
        "method": "GET",
        "headers": {},
        "data": "{}"
      })
      .done(function(response){
        console.log(response);
      });
}

// TEST API in postman
// http://api.themoviedb.org/3/search/movie?api_key=51a0abce642402e7b8d43b2081302e77&query=Troll

