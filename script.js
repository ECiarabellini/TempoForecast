var dateToday = document.getElementById("dateToday");
var weatherAPIkey = 'f2046faa5fb1f80c64e26de7f08054f2'; 
var weatherForm = document.getElementById('weather-form');
var weatherDisplay = document.getElementById('weather');
var cityName = document.getElementById("city");
var temperature = document.getElementById("temp");
var conditions = document.getElementById("conditions");
var encodedConditions;
var searchHistory = localStorage.getItem('searchHistory') || null;
var zipCode;
var songTitles = document.querySelectorAll(".song-title");
var songArt = document.querySelectorAll(".album-art");
var songArtist = document.querySelectorAll(".artist-name");
var songSpotifyLink = document.querySelectorAll(".spotify-link");
var clientId ='654e967c7c3d45d99004f861a9138b20';
var clientSecret = 'e54801a1bd7f4b10bb17b8fbb976dc3b';
var zipCodeInput = document.getElementById('zip-code');

//// Fetch weather conditions from weather api based on a given zip code
function fetchWeather(zip) {
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zip}&appid=${weatherAPIkey}&units=imperial`;
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          updateWeather(data);
          spotifySearch();
      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
    }); 
}

//// Display weather conditions fetched from Weather API on the webpage
function updateWeather(data) {
  cityName.textContent = data.name;
  temperature.textContent = data.main.temp;
  dateToday.textContent = dayjs().format('M/D/YYYY h:mma');
  conditions.textContent = data.weather[0].description;
  encodedConditions = encodeURIComponent(data.weather[0].description);  //puts weather conditions retrieved from Weather API into a format useable in Spotify API URL fetch
}


//// Spotify API requires an access token in addition to clientID and clientSecret in order to fetch their API. Access token is valid for 1 hour.
/// authOptions is the format needed to fetch the access token
var authOptions = {
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

function spotifySearch() { 
  fetch('https://accounts.spotify.com/api/token', authOptions)
    .then(response => response.json())
    .then(data => {
      if (data.access_token) { 
        fetch('https://api.spotify.com/v1/search?q=' + encodedConditions + '&type=track&limit=6', {method: "GET", headers: {"Authorization": "Bearer " + data.access_token}})
        .then(response => response.json())
        .then(data => {
          console.log(data);
          var details = data.tracks.items;
          for (let i = 0; i < songTitles.length; i++){    //// Display Spotify songs fetched from Spotify API onto the song cards on the webpage
            songTitles[i].textContent = details[i].name
            songArt[i].src = details[i].album.images[0].url
            songArtist[i].textContent  = details[i].artists[0].name
            songSpotifyLink[i].href  = details[i].external_urls.spotify
          }
        })
      }
    })
    .catch(error => {
      console.error('Error:', error);
    }); 
};

//// On initial page load, display weather and tracks for most recently searched zip code (saved in local storage) or for 48824 if none saved
if (searchHistory){
  zipCode = localStorage.getItem('searchHistory');
  fetchWeather(zipCode);
} else {
  fetchWeather(48824);
};

//// When a new zip code is searched, store that zip code in local storage and display weather info and related songs for that zip code's weather
weatherForm.addEventListener('submit',function(event){
  event.preventDefault();
  zipCode = zipCodeInput.value;
  fetchWeather(zipCode);
  localStorage.setItem('searchHistory', zipCode);
  zipCodeInput.value="";
});  