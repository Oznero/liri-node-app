require('dotenv').config();
let fs = require('fs');
const request = require('request');
let keys = require('./keys.js');
let Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);


function getSpotifySong(secondParam) {
    if (process.argv[3]) {
        spotify.search({ type: 'track', query: process.argv[3] }, function (err, data) {
            let artists = '';
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            body = data.tracks.items[0];
            body.artists.forEach(artist => {
                artists += artist.name;
            });
            console.log(`Artist(s): ${artists}`);
            console.log(`Song Name: ${body.name}`);
            console.log(`Preview Link: ${body.external_urls.spotify}`);
            console.log(`Album: ${body.album.name}`);
        });
    }
    if (secondParam) {
        spotify.search({ type: 'track', query: secondParam }, function (err, data) {
            let artists = '';
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            body = data.tracks.items[0];
            body.artists.forEach(artist => {
                artists += artist.name;
            });
            console.log(`Artist(s): ${artists}`);
            console.log(`Song Name: ${body.name}`);
            console.log(`Preview Link: ${body.external_urls.spotify}`);
            console.log(`Album: ${body.album.name}`);
        });
    } else {
        spotify.search({ type: 'track', query: "What's My Age Again" }, function (err, data) {
            let artists = '';
            if (err) {
                return console.log('Error occurred: ' + err);
            }

            body = data.tracks.items[0];
            body.artists.forEach(artist => {
                artists += artist.name;
            });
            console.log(`Artist(s): ${artists}`);
            console.log(`Song Name: ${body.name}`);
            console.log(`Preview Link: ${body.external_urls.spotify}`);
            console.log(`Album: ${body.album.name}`);
        });
    }
}

function bandsintown() {
    request(`https://rest.bandsintown.com/artists/${process.argv[3]}/events?app_id=codingbootcamp`, (error, response, body) => {
        if (!error && response.statusCode === 200) {

            let response = JSON.parse(body);
            for (let i = 0; i < response.length; i++) {
                console.log(`\nVenue name: ${response[i].venue.name}`);
                console.log(`Venue city: ${response[i].venue.city}\n`);
            }
        }

    });
}
function movieThis() {
    if (process.argv[3]) {
        const movieName = process.argv.slice(3).join(' ');
        request(`http://www.omdbapi.com/?apikey=trilogy&t=${movieName}`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let response = JSON.parse(body);
                console.log(`\nMovie Title: ${response.Title}`);
                console.log(`IMDB Rating: ${response.Ratings[0].Value}`);
                console.log(`Rotten tomatoes rating ${response.Ratings[1].Value}`);
                console.log(`Movie production country: ${response.Country}`);
                console.log(`Movie language: ${response.Language}`);
                console.log(`Plot of the movie: ${response.Plot}`);
                console.log(`Actors in movie: ${response.Actors}`);
            }
        });
    } else {
        request(`http://www.omdbapi.com/?apikey=trilogy&t=Mr. Nobody`, (error, response, body) => {
            if (!error && response.statusCode === 200) {
                let response = JSON.parse(body);
                console.log(`\nMovie Title: ${response.Title}`);
                console.log(`IMDB Rating: ${response.Ratings[0].Value}`);
                console.log(`Rotten tomatoes rating ${response.Ratings[1].Value}`);
                console.log(`Movie production country: ${response.Country}`);
                console.log(`Movie language: ${response.Language}`);
                console.log(`Plot of the movie: ${response.Plot}`);
                console.log(`Actors in movie: ${response.Actors}`);
            }
        });
    }

}

if (process.argv[2] === 'spotify-this-song') {
    getSpotifySong();
}
if (process.argv[2] === 'concert-this') {
    bandsintown();
}
if (process.argv[2] === 'movie-this') {
    movieThis();
}
if (process.argv[2] === 'do-what-it-says') {
    fs.readFile('random.txt', 'utf8', function (error, data) {

        if (error) {
            return console.log(error);
        }

        const dataList = data.split(',');
        const firstParam = dataList[0].trim();
        const secondParam = dataList[1].trim();
        if (firstParam === 'spotify-this-song') {
            getSpotifySong(secondParam);
        }
    });
}