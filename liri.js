require("dotenv").config();

var keys = require("./keys.js");
var Twitter = require('twitter');
var Spotify = require('node-spotify-api');
var request = require("request");
var fs = require("fs");

// Sets action accroding to case.
var action = process.argv[2];
var nodeArgs = process.argv;
var movieName = "";
var songName = "";

var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);

switch (action) {
    case "my-tweets":
    myTweets();
    break;

    case "spotify-this-song":
    spotifySongs();
    break;

    case "movie-this":
    movies();
    break;

    case "do-what-it-says":
    doAsISay();
    break;
}
// Liri Tweet Finder
function myTweets(){
    var params = {screen_name: 'b3nL30n'};
    client.get('statuses/user_timeline', params, function(error, tweets, response) {
        if (!error) {
            for (var x=0; x<tweets.length; x++) {
                console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
                console.log("       ___             _            ");
                console.log("| o._o  |     _  __|_ |_o._  _| _ ._");
                console.log("|_|| |  |`/`/(/_(/_|_ | || |(_|(/_| ");
                console.log("");
                console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
                console.log(tweets[x].text);
            }
        }
    });
}
// Spotify Liri Song function
function spotifySongs (){
    for (var j = 3; j < nodeArgs.length; j++) {
        if (j > 3 && j < nodeArgs.length) {
            songName = songName + "+" + nodeArgs[j];
        } 
        else {
            songName += nodeArgs[j];
        }  
    }
    if (process.argv[3]===undefined) {
        songName = songName + "The Sign";
    }

    spotify.search({ type: 'track', query: songName }, function(err, data) {
        if (err) {
        return console.log('Error occurred: ' + err);
        }
            console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
            console.log("        __           _    __           _            ");
            console.log("| o._o (_ ._  __|_o_|_   (_  _ ._  _  |_o._  _| _ ._");
            console.log("|_|| | __)|_)(_)|_| | `/ __)(_)| |(_| | || |(_|(/_| ");
            console.log("          |           /            _|               ");
            console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
            console.log("Artist: " + data.tracks.items[0].artists[0].name);
            console.log("-----------------------------------------------------");
            console.log("Song: " + data.tracks.items[0].name);
            console.log("-----------------------------------------------------");
            console.log("Preview URL: " + data.tracks.items[0].preview_url);
            console.log("-----------------------------------------------------");
            console.log("Album: " + data.tracks.items[0].album.name);
            console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
    });
    fs.appendFile("log.txt", songName, function(err){
        if (err) {
            return console.log(err);
        }
        console.log("log.txt was updated!");
    });
}

// OMDB Liri Movie function
function movies(){
    for (var i = 3; i < nodeArgs.length; i++) {
        if (i > 3 && i < nodeArgs.length) {
            movieName = movieName + "+" + nodeArgs[i];
        }
        else {
            movieName += nodeArgs[i];
        }
    }
    if (process.argv[3]===undefined) {
        movieName = movieName + "Mr. Nobody";
    }

    var queryUrl = "http://www.omdbapi.com/?t=" + movieName + "&y=&plot=short&apikey=trilogy";
    console.log(queryUrl);

    request(queryUrl, function(error,response, body){
        if (!error && response.statusCode === 200){
            console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
            console.log("                      __            ");
            console.log("| o._o |`/| _   o _  (_  _  _..__|_ ");
            console.log("|_|| | |  |(_)`/|(/_ __)(/_(_||(_| |");
            console.log("");
            console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
            console.log("Title: " + JSON.parse(body).Title);
            console.log("-----------------------------------------------------");
            console.log("Release Year: " + JSON.parse(body).Year);
            console.log("-----------------------------------------------------");
            console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
            console.log("-----------------------------------------------------");
            console.log("Rotten Tomatoes Rating " + JSON.parse(body).Ratings[1].Value);
            console.log("-----------------------------------------------------");
            console.log("Produced In: " + JSON.parse(body).Country);
            console.log("-----------------------------------------------------");
            console.log("Language: " + JSON.parse(body).Language);
            console.log("-----------------------------------------------------");
            console.log("Plot: " + JSON.parse(body).Plot);
            console.log("-----------------------------------------------------");
            console.log("Starring: " + JSON.parse(body).Actors);
            console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
        }
    });
    fs.appendFile("log.txt", movieName, function(err){
        if (err) {
            return console.log(err);
        }
        console.log("log.txt was updated!");
    });
}
// Liri Do As It Says Function.
function doAsISay() {
    fs.readFile("random.txt", "utf8", function(error, data){
        if (error){
            return console.log(error);
        }
    // console.log(data);
    var dataArr = data.split(",");
    // console.log(dataArr);
    // console.log(dataArr[1]);
        spotify.search({ type: 'track', query: dataArr[1] }, function(err, data) {
            if (err) {
            return console.log('Error occurred: ' + err);
            }
                console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
                console.log("        __           _    __           _            ");
                console.log("| o._o (_ ._  __|_o_|_   (_  _ ._  _  |_o._  _| _ ._");
                console.log("|_|| | __)|_)(_)|_| | `/ __)(_)| |(_| | || |(_|(/_| ");
                console.log("          |           /            _|               ");
                console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
                console.log("Artist: " + data.tracks.items[0].artists[0].name);
                console.log("-----------------------------------------------------");
                console.log("Song: " + data.tracks.items[0].name);
                console.log("-----------------------------------------------------");
                console.log("Preview URL: " + data.tracks.items[0].preview_url);
                console.log("-----------------------------------------------------");
                console.log("Album: " + data.tracks.items[0].album.name);
                console.log("*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*-*");
        });
    });
}