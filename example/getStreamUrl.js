var Spotify = require('../');
var login = require('../login');

// determine the URI to play, ensure it's a "track" URI
var uri = process.argv[2] || 'spotify:track:1ZBAee0xUblF4zhfefY0W1';
var type = Spotify.uriType(uri);
if ('track' != type) {
  throw new Error('Must pass a "track" URI, got ' + JSON.stringify(type));
}

// initiate the Spotify session
Spotify.login(login.username, login.password, function (err, spotify) {
  if (err) throw err;

  // first get a "Track" instance from the track URI
  spotify.get(uri, function (err, track) {
    if (err) throw err;
    console.log('Got track: %s - %s', track.artist[0].name, track.name);
    console.log(track);
    track.getStreamURL(function(err, trackResponse) {
      console.log(trackResponse);
    })
  });
});
