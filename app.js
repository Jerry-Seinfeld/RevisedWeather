
let appId = '540ca1e82e8d36d3aafc388a0eedd33c';
let units = 'imperial';
let searchMethod;

function getSearchMethod(searchtextInput) {
    if(searchtextInput.length === 5 && Number.parseInt(searchtextInput) + '' === searchtextInput)
        searchMethod = 'zip';
    else
        searchMethod = 'q';
}

function setPositionForWeatherboy() {
    let Weatherboy = document.getElementById('Weatherboy');
    let WeatherboyHeight = Weatherboy.clientHeight;
    let WeatherboyWidth = Weatherboy.clientWidth;
Weatherboy.style.left = `calc(50% - ${WeatherboyWidth/2}px)`;
Weatherboy.style.top = `calc(50% - ${WeatherboyHeight/1.3}px)`;
Weatherboy.style.visibility = 'visible'; 
}


    document.getElementById('ResultButton').addEventListener('click', () => {
        let searchtextInput = document.getElementById('searchInput').value;
        if(searchtextInput)
            searchWeather(searchtextInput);
    })




function searchWeather(searchtextInput) {
    getSearchMethod(searchtextInput);
    fetch(`http://api.openweathermap.org/data/2.5/weather?${searchMethod}=${searchtextInput}&APPID=${appId}&units=${units}`).then(result => {
        return result.json();
    }).then(result => {
        init(result);
    })
}

function init(weatherResult) {

        let weatherIcon = document.getElementById('documentIconImg');

        let weatherInfoHeader = document.getElementById('weatherInfoHeader');

        let humidityElement = document.getElementById('humidity');
        
        let LocationHeader = document.getElementById('LocationHeader');
    
        let TemperatureElement = document.getElementById('Temperature');
    
        let windSpeedElement = document.getElementById('windSpeed');
    
     


    let resultDescription = weatherResult.weather[0].description;
    weatherInfoHeader.innerText = resultDescription.charAt(0).toUpperCase() + resultDescription.slice(1);

        TemperatureElement.innerHTML = Math.floor(weatherResult.main.temp) + '&#176';
    windSpeedElement.innerHTML = 'Winds at ' + Math.floor(weatherResult.wind.speed) + ' m/s';
        LocationHeader.innerHTML = weatherResult.name;
    humidityElement.innerHTML = 'Humidity levels at ' + weatherResult.main.humidity + '%';

    weatherIcon.src = 'http://openweathermap.org/img/wn/' + weatherResult.weather[0].icon + '.png';

    setPositionForWeatherboy();
}

