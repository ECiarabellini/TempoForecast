var dateToday = document.getElementById("dateToday");
dateToday.textContent = dayjs().format('M/D/YYYY h:mma');

////////Display Spotify search results on the page ////
var songTitles = document.querySelectorAll(".song-title");
var songArt = document.querySelectorAll(".album-art");
var songArtist = document.querySelectorAll(".artist-name");
var songSpotifyLink = document.querySelectorAll(".spotify-link");




const clientId ='654e967c7c3d45d99004f861a9138b20';
const clientSecret = 'e54801a1bd7f4b10bb17b8fbb976dc3b';

const authOptions = {
  method: 'POST',
  headers: {
    'Content-Type': 'application/x-www-form-urlencoded',
  },
  body: new URLSearchParams({
    grant_type: 'client_credentials',
    client_id: clientId,
    client_secret: clientSecret,
  }),
};

var accessToken = fetch('https://accounts.spotify.com/api/token', authOptions)
  .then(response => response.json())
  .then(data => {
    if (data.access_token) {
      const token = data.access_token;

      return token;
    }
  })
  .catch(error => {
    console.error('Error:', error);
  });


var tracks = fetch('https://api.spotify.com/v1/search?q=sunny&type=track&limit=6', {method: "GET", headers: {"Authorization": "Bearer " + accessToken}})
  .then(response => response.json())
.then(data => {populate(data.tracks.items)})

function populate(data){
  console.log(data)
for (let i = 0; i < songTitles.length; i++){
  songTitles[i].textContent = data[i].name
  
  songArt[i].src = data[i].album.images[0].url

  songArtist[i].textContent  = data[i].artists[0].name

  songSpotifyLink[i].href  = data[i].external_urls.spotify
}

};
