const key = 'fa4902bd587104b68a518d9b60619cf8';

$(document).ready(function() {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const city = urlParams.get('city');

    //let weather = getWeather(city);

});

async function getWeather(id) {
    const base = 'https://api.openweathermap.org/data/2.5/forecast';
    const query = `?id=${id}&units=metric&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}