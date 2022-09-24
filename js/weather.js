const key = 'fa4902bd587104b68a518d9b60619cf8';

const leiriaID = '2267095';
const lisboaID = '2267057';
const portoID = '2735943';
const coimbraID = '2740637';
const oliveiraID = '2737038';
const viseuID = '2732265'

function getWeather(id) {
    fetch(`http://api.openweathermap.org/data/2.5/weather?id=${id}&appid=${key}&units=metric`)
        .then(function (resp) {
            return resp.json()
        })
        .then(function (data) {
            drawWeather(data);
        })
        .catch(function () {
            // catch any errors
        });
}

function drawWeather(d) {
    let celcius = Math.round(parseFloat(d.main.temp));
    let fahrenheit = Math.round(((parseFloat(d.main.temp)) * 1.8) + 32);
    let description = d.weather[0].description;

    document.getElementById('description').innerHTML = description;
    document.getElementById('temp').innerHTML = celcius + '&deg;';
    document.getElementById('location').innerHTML = d.name;

    if (description.indexOf('rain') > 0) {
        document.body.className = 'rainy';
    } else if (description.indexOf('cloud') > 0) {
        document.body.className = 'cloudy';
    } else if (description.indexOf('sunny') > 0) {
        document.body.className = 'sunny';
    } else {
        document.body.className = 'clear';
    }
}