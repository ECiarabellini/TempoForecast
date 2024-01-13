
    var dateToday = document.getElementById("dateToday");

    var apiKey = 'f2046faa5fb1f80c64e26de7f08054f2'; 
    var weatherForm = document.getElementById('weather-form');
    var weatherDisplay = document.getElementById('weather');

    var cityName = document.getElementById("city");
    var temperature = document.getElementById("temp");
    var conditions = document.getElementById("conditions");
    var encodedConditions;
    var searchHistory = localStorage.getItem('searchHistory') || [];
    var zipCode;
   

function fetchWeather() {

  var zipCodeInput = document.getElementById('zip-code');
  zipCode = zipCodeInput.value;
  

  if(zipCode){
    localStorage.setItem('searchHistory', zipCode);
  };
  zipCodeInput.value="";
  // API request
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?zip=${zipCode}&appid=${apiKey}&units=imperial`;

  console.log("apiUril", apiUrl);
  fetch(apiUrl)
      .then(response => response.json())
      .then(data => {
          updateWeather(data);
      })
      .then (spotifySearch()) 
  };

if (searchHistory){
  console.log(searchHistory);
  zipCode = localStorage.getItem('searchHistory');
  fetchWeather();
}
    
weatherForm.addEventListener('submit',function(event){
  event.preventDefault();
  fetchWeather();
});             

function updateWeather(data) {

  cityName.textContent = data.name;
  temperature.textContent = data.main.temp;
  dateToday.textContent = dayjs().format('M/D/YYYY h:mma');
  conditions.textContent = data.weather[0].description;
  encodedConditions = encodeURIComponent(data.weather[0].description);
  
  console.log(data.weather[0].description);
  console.log(data);
  console.log(encodedConditions);
  
    // Updates the zip code's weather to HTML
    // weatherDisplay.innerHTML = `
    //     <h1 class="title">${cityName}</h1>
    //     <div class="body is-size-5">Temp: <span id="temp">${temperature}</span>&deg;F</div>
    //     <div class="body is-size-5">Conditions: <span id="conditions">${conditions}</span></div>
    //     <div class="is-size-5" id="dateToday">${currentDate}</div>
    // `;
}


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


function spotifySearch() { fetch('https://accounts.spotify.com/api/token', authOptions)
  .then(response => response.json())
  .then(data => {
    if (data.access_token) { 
      console.log("encodedConditions", encodedConditions);
      fetch('https://api.spotify.com/v1/search?q=' + encodedConditions + '&type=track&limit=6', {method: "GET", headers: {"Authorization": "Bearer " + data.access_token}})
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
};

