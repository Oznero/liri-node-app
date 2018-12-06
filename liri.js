require('dotenv').config();
const fs = require('fs');
const request = require('request');
let keys = require('./keys.js');
var Spotify = require('node-spotify-api');
const spotify = new Spotify(keys.spotify);

/*
search: function({ type: 'artist OR album OR track', query: 'My search query', limit: 20 }, callback);

concert-this
spotify-this-song
movie-this
do-what-it-says
*/
if (process.argv[2] === 'spotify-this-song') {
    spotify.search({ type: 'track', query: 'All the Small Things' }, function (err, data) {
        if (err) {
            return console.log('Error occurred: ' + err);
        }

        console.log(data);
    });
}
if (process.argv[2] === 'concert-this'){
   request(`https://rest.bandsintown.com/artists/${process.argv[3]}/events?app_id=codingbootcamp`, (error, response, body) =>{
    if (!error && response.statusCode === 200) {
    
        const venueName = JSON.parse(body).venue.name;
        const venueCity = JSON.parse(body).venue.city;
    
        console.log(`Latest price for ${venueName} is: ${venueCity}`);
      }

   });
}