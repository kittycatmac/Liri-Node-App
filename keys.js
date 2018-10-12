console.log('key is loaded');
require("dotenv").config();
console.log(process.env.SPOTIFY_ID);
exports.spotify = {
    id: process.env.SPOTIFY_ID,
    secret: process.env.SPOTIFY_SECRET
};
