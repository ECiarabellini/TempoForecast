

    var apiKey = 'f2046faa5fb1f80c64e26de7f08054f2'; 
    var weatherForm = document.getElementById('weather-form');
    var weatherDisplay = document.getElementById('weather');


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


var dateToday = document.getElementById("dateToday");
dateToday.textContent = dayjs().format('M/D/YYYY h:mma');

////////Display Spotify search results on the page ////
var songTitles = document.querySelectorAll(".song-title");
var songArt = document.querySelectorAll(".album-art");
var songArtist = document.querySelectorAll(".artist-name");
var songSpotifyLink = document.querySelectorAll(".spotify-link");

function updateSongCards(jsonFile) {
    var songsArray = [];
    for (let i=0; i<6; i++){
        var title = jsonFile["tracks"]["items"][i]["name"];
        var artist = jsonFile["tracks"]["items"][i]["album"]["artists"][0]["name"];
        var songURL = jsonFile["tracks"]["items"][i]["external_urls"]["spotify"];
        console.log(title, "_", artist, "_", songURL);
        var song = [title, artist, songURL];
        songsArray.push(song);
        console.log(songsArray); 
    };
    songTitles.forEach(function(title, index) {
        title.textContent = songsArray[index][0];
    });

    songArtist.forEach(function(artist, index) {
        artist.textContent = songsArray[index][1];
    });

    songSpotifyLink.forEach(function(link, index) {
        link.href = songsArray[index][2];
    });
}

updateSongCards(jsonFile);

