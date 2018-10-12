var request = require("request");
var fs = require("fs");

// Create the Bandsintown constructor
var Bands = function() {
    // `divider` will be used as a spacer between the bands data we print in log.txt
    var divider = "\n------------------------------------------------------------\n\n";
  
    // findConcert takes in the name of an artist and searches the Bandsintown API for an event
    this.findConcert = function(artist) {
        var queryURL = "https://rest.bandsintown.com/artists/" + artist + "/events?app_id=codingbootcamp"
  
      request(queryURL, function(err, response, body) {
        // parse the response body (string) to a JSON object
        var jsonData = JSON.parse(body);
  
        // showData ends up being the string containing the show data we will print to the console
        var showData = [
          "Venue: " + jsonData.name,
          "location: " + jsonData.city,
          "date: " + jsonData.datetime,
          "line-up: " + jsonData.lineup,
          "description: " + jsonData.description,
          "URL: " + jsonData.url
        ].join("\n\n");
  
        // Append showData and the divider to log.txt, print showData to the console
        fs.appendFile("log.txt", showData + divider, function(err) {
          if (err) throw err;
          console.log(showData);
        });
      });
    };
};
  

  //module.exports = Bands;