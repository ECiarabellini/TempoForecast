var dateToday = document.getElementById("dateToday");
dateToday.textContent = dayjs().format('M/D/YYYY h:mma');

////////Display Spotify search results on the page ////
var songTitles = document.querySelectorAll(".song-title");
var songArt = document.querySelectorAll(".album-art");
var songArtist = document.querySelectorAll(".artist-name");
var songSpotifyLink = document.querySelectorAll(".spotify-link");