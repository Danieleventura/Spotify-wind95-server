const express = require('express')
const request = require('request');
const dotenv = require('dotenv');
const cors = require("cors");
const path = require('path');
const port = 5000

global.access_token = ''

dotenv.config()

var spotify_client_id = process.env.SPOTIFY_CLIENT_ID
var spotify_client_secret = process.env.SPOTIFY_CLIENT_SECRET
var url = process.env.PROD_URL
var server_url = process.env.SERVER_URL
var spotify_redirect_uri = url + '/callback'

var generateRandomString = function (length) {
  var text = '';
  var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (var i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }
  return text;
};

var app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get('/auth/status', (req, res) => {
  console.log(`Server OK`)
  res.send("Server OK")
  res.json({ status: "Server OK"})
})

app.get('/auth/login', (req, res) => {

  var scope = "user-read-playback-state user-modify-playback-state user-modify-playback-state streaming user-read-email user-read-private playlist-read-private playlist-read-private playlist-read-collaborative"
  var state = generateRandomString(16);

  var auth_query_parameters = new URLSearchParams({
    response_type: "code",
    client_id: spotify_client_id,
    scope: scope,
    redirect_uri: spotify_redirect_uri,
    state: state
  })

  res.redirect('https://accounts.spotify.com/authorize/?' + auth_query_parameters.toString());
})

app.get('/auth/callback', (req, res) => {

  var code = req.query.code;

  var authOptions = {
    url: 'https://accounts.spotify.com/api/token',
    form: {
      code: code,
      redirect_uri: spotify_redirect_uri,
      grant_type: 'authorization_code'
    },
    headers: {
      'Authorization': 'Basic ' + (Buffer.from(spotify_client_id + ':' + spotify_client_secret).toString('base64')),
      'Content-Type' : 'application/x-www-form-urlencoded'
    },
    json: true
  };

  request.post(authOptions, function(error, response, body) {
    if (!error && response.statusCode === 200) {
      access_token = body.access_token;
      res.json({ access_token: access_token})
    }
  });
})

app.get('/auth/token', (req, res) => {
  res.json({ access_token: access_token})
})


app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
