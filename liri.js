require("dotenv").config();

//the request and file system requires
var request = require("request");
var fs = require("fs");

//Bands in town requires
var moment = require("moment");

// spotify requires and imports
var keys = require("./keys.js");
var Spotify = require("node-spotify-api");
var spotify = new Spotify(keys.spotify);
//console.log(spotify);

//get user commands
var action = process.argv[2];
var input = process.argv.slice(3).join(" ");

//Bandsintown request-------------------------------------------->
if(action === "concert-this") {
    //request to api with input
    request("https://rest.bandsintown.com/artists/" + input + "/events?app_id=1f183818c8dd53bdeb1971486b5b1699", function(err, response, body) {
        
        // parse the response body (string) to a JSON object
        var jsonData = JSON.parse(body);
        
        //loop through Bandsintown array
        for ( i = 0; i < jsonData.length; i++){        
            
            // showData ends up being the string containing the show data we will print to the console
        var showData = [
          "Venue: " + jsonData[i].venue.name,
          "location: " + jsonData[i].venue.city + " ",
          "date: " + moment(jsonData[i].datetime).format("MM/DD/YYYY"),
          "line-up: " + jsonData[i].lineup,
          "URL: " + jsonData[i].url
        ].join("\n\n");
  
        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", showData, function(err) {
          if (err && response.statusCode === 200) {throw err;
          }
          console.log(showData);
        });
        }
    });
}


//omdb request--------------------------------------------------->
if(action === "movie-this") {
    //request to api with input
    request("http://www.omdbapi.com/?t=" + input + "&y=&plot=short&apikey=2d47bd98", function(err, response, body) {

        // parse the response body (string) to a JSON object
        var jsonData = JSON.parse(body);
            
        // movieData ends up being the string containing the show data we will print to the console
        var movieData = [
        "Title of the movie: " + jsonData.Title,
        "Year the movie came out: " + jsonData.Released,
        "IMDB Rating of the movie: " + jsonData.Rated,
        "Rotten Tomatoes Rating of the movie: " + jsonData.Ratings[1].Value,
        "Country where the movie was produced: " + jsonData.Country,
        "language of the movie: " + jsonData.Language,
        "Actors in the movie: " + jsonData.Actors
        ].join("\n\n");

        console.log(movieData);
        
        // Append movieData and the divider to log.txt, print movieData to the console
        fs.appendFile("log.txt", movieData, function(err) {
            if (err && response.statusCode === 200) {throw err;
            }
            console.log(movieData);
        });
    });
}

//spotify api request------------------------------------------------>
if(action === "spotify-this-song") {
    //search with spotify-node-api
    spotify.search({type: "track", query: input}, function(err, data){
        
        // node api is already set as an object
        var jsonData = data.tracks.items[0];

        // songData ends up being the string containing the song data we will print to the console
        var songData = [
        "Artist: " + jsonData.album.artists[0].name,
        "The song's name: " + jsonData.name, 
        "A preview link of the the song from Spotify: " + jsonData.preview_url,  
        "The album that the song is from: " + jsonData.album.name,  
        ].join("\n\n");
    
        // Append songData and the divider to log.txt, print songData to the console
        fs.appendFile("log.txt", songData, function(err) {
        if (err && data.statusCode === 200) {throw err;}
        console.log(songData);
        });
    });
}
