var dotenv = require("dotenv").config();
var keys = require("keys.js");
var spotifyKey = new Spotify(keys.spotify);

var options = {
    provider: "spotify",
    apiKey: spotifyKey
};

var spotKey = spotifyKey(options);
var song = process.argv.slice(2).join(" ");
console.log("Searching for " + song);

spotKey.spotcode(song, function(err,data) {
    console.log(JSON.stringify(data, null, 2));
});