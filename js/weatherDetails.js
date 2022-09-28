const key = 'fa4902bd587104b68a518d9b60619cf8';

$(document).ready(function() {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const city = urlParams.get('city');

    let weather = getWeather(city);
    weather.then(data => {
        const city = document.getElementById('city');
        city.innerHTML = data.name;

        //const country = document.getElementById('country');
        //country.innerHTML = data.sys.country;

        const hourDate = document.getElementById('hourDate');
        hourDate.innerHTML = new Date(data.dt * 1000).toLocaleString();

        const temp = document.getElementById('temp');
        temp.innerHTML = data.main.temp + 'ºC';

        const humidity = document.getElementById('humidity');
        humidity.innerHTML = data.main.humidity + '%';

        const wind = document.getElementById('wind');
        wind.innerHTML = data.wind.speed + 'm/s';

        const clouds = document.getElementById('clouds');
        clouds.innerHTML = data.clouds.all + '%';

        const pressure = document.getElementById('pressure');
        pressure.innerHTML = data.main.pressure + 'hPa';

        const coord = document.getElementById('coord');
        coord.innerHTML = data.coord.lat + 'º, ' + data.coord.lon + 'º';

        const weatherIcon = document.getElementById('weatherIcon');
        weatherIcon.title = data.weather[0].description;


        weatherIcon.src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
    });
});

async function getWeatherForecast(id) {
    const base = 'https://api.openweathermap.org/data/2.5/forecast';
    const query = `?id=${id}&units=metric&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}

async function getWeather(id) {
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?id=${id}&units=metric&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}