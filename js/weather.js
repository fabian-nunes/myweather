const key = 'fa4902bd587104b68a518d9b60619cf8';

const leiriaID = '2267095';
const lisboaID = '2267057';
const portoID = '2735943';
const coimbraID = '2740637';
const oliveiraID = '2737038';
const viseuID = '2732265'

const idArray = [leiriaID, oliveiraID, lisboaID, portoID, coimbraID, viseuID];

async function getWeather(id) {
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?id=${id}&units=metric&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}

$( document ).ready(function() {
    for (let i = 0; i < idArray.length; i++) {
        let weather = getWeather(idArray[i]);
        weather.then(data => {
            document.getElementById('city'+(i+1)).innerHTML = data.name;
            document.getElementById('icon'+(i+1)).src = 'http://openweathermap.org/img/w/' + data.weather[0].icon + '.png';
            document.getElementById('temprature'+(i+1)).innerHTML = data.main.temp + '°C';
        });
    }
});