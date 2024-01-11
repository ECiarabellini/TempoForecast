

    var apiKey = 'f2046faa5fb1f80c64e26de7f08054f2'; 
    var weatherForm = document.getElementById('weather-form');
    var weatherDisplay = document.getElementById('weather');

    var cityName = document.getElementById("city");
    var temperature = document.getElementById("temp");
    var conditions = document.getElementById("conditions");
    


    weatherForm.addEventListener('submit', function (event) {
        event.preventDefault();
        console.log("search zip")

        var zipCodeInput = document.getElementById('zip-code');
        var zipCode = zipCodeInput.value;

        // API request
        var apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`;

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                updateWeather(data);
            })
            .catch(error => {
                console.error('Error fetching weather data:', error);
            });
    });

    function updateWeather(data) {
        var cityName = data.name;
        var temperature = data.main.temp;
        var conditions = data.weather[0].description;
        var currentDate = dayjs().format('MMMM D, YYYY h:mma');

        // Updates the zip code's weather to HTML
        weatherDisplay.innerHTML = `
            <h1 class="title">${cityName}</h1>
            <div class="body is-size-5">Temp: <span id="temp">${temperature}</span>&deg;F</div>
            <div class="body is-size-5">Conditions: <span id="conditions">${conditions}</span></div>
            <div class="is-size-5" id="dateToday">${currentDate}</div>
        `;
    }


// var dateToday = document.getElementById("dateToday");
// dateToday.textContent = dayjs().format('M/D/YYYY h:mma');

////////Display Spotify search results on the page ////
var songTitles = document.querySelectorAll(".song-title");
var songArt = document.querySelectorAll(".album-art");
var songArtist = document.querySelectorAll(".artist-name");
var songSpotifyLink = document.querySelectorAll(".spotify-link");


var clientId ='654e967c7c3d45d99004f861a9138b20';
var clientSecret = 'e54801a1bd7f4b10bb17b8fbb976dc3b';

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

var accessToken = fetch('https://accounts.spotify.com/api/token', authOptions)
  .then(response => response.json())
  .then(data => {
    if (data.access_token) { fetch('https://api.spotify.com/v1/search?q=moderate+rain&type=track&limit=6', {method: "GET", headers: {"Authorization": "Bearer " + data.access_token}})
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

    }
  })
  .catch(error => {
    console.error('Error:', error);
  });