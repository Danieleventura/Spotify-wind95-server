# Spotify Server

Spotify Windows 95 project server

The application can be viewed at https://spotify-windows-95.vercel.app/.

React app: https://github.com/Danieleventura/Spotify-Windows-95.


## Using your own credentials

You will need to register your app and get your own credentials from the
[Spotify for Developers Dashboard](https://developer.spotify.com/dashboard/)

To do so, go to your Spotify for Developers Dashboard, create your
application and register the following callback URI:

`http://localhost:3000/auth/callback`

Once you have created your app, create a file called `.env` in the root folder
of the repository with your Spotify credentials:

```bash
SPOTIFY_CLIENT_ID='my_client_id'
SPOTIFY_CLIENT_SECRET='my_client_secret'
```

For this application you need the url of your react project:

```bash
PROD_URL='url production'
```
## Installation

These examples run on Node.js. On its
[website](http://www.nodejs.org/download/) you can find instructions on how to
install it.

Once installed, clone the repository and install its dependencies running:

```bash
npm install
```

## Running the App Locally

Start with the following command:

```bash
npm run dev
```

The React application will start on `http://localhost:3000`
