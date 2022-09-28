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

    weather = getWeatherForecast(city);
    weather.then(data => {
        const dateFirst = data.list[0].dt;
        data.list.forEach(element => {
            if (element.dt === dateFirst || element.dt === dateFirst + 86400 || element.dt === dateFirst + 86400 * 2 || element.dt === dateFirst + 86400 * 3 || element.dt === dateFirst + 86400 * 4) {
                createWeatherCard(element, '5DayRow');
            }

            weather.then(data => {
                data.list.forEach(element => {
                    createWeatherCard(element, '3HourRow');
                });
            });
        });
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

function createWeatherCard(element, row) {
    //Create <div class="col-4">
    let col = document.createElement('div');
    col.className = 'col-3';
    document.getElementById(row).insertAdjacentElement('beforeend', col);

    //Create <div class="card forecastCard centerVertical">
    let card = document.createElement('div');
    card.className = 'card forecastCard centerVertical';
    col.insertAdjacentElement('beforeend', card);

    //Create <div class="class="card-header w-100"">
    let cardHeader = document.createElement('div');
    cardHeader.className = 'card-header w-100';
    cardHeader.innerHTML = new Date(element.dt * 1000).toLocaleString();
    card.insertAdjacentElement('beforeend', cardHeader);

    //Create <img src="http://openweathermap.org/img/w/03d.png" class="card-img-bottom weatherImg" alt="weather" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
    let weatherImg = document.createElement('img');
    weatherImg.className = 'card-img-bottom weatherImg';
    weatherImg.src = 'http://openweathermap.org/img/w/' + element.weather[0].icon + '.png';
    weatherImg.alt = 'weather';
    weatherImg.title = element.weather[0].description;
    weatherImg.setAttribute('data-bs-toggle', 'tooltip');
    weatherImg.setAttribute('data-bs-placement', 'top');
    card.insertAdjacentElement('beforeend', weatherImg);

    //Create <p>Temp: 20ºC</p>
    let temp = document.createElement('p');
    temp.innerHTML = 'Temp: ' + element.main.temp + 'ºC';
    card.insertAdjacentElement('beforeend', temp);
}

function changeTab(tab) {
    if (tab === 0) {
        document.getElementById('5Day').hidden = true;
        document.getElementById('3Hour').hidden = false;
        document.getElementById('5DayNav').className = 'nav-link';
        document.getElementById('3HourNav').className = 'nav-link active';
    } else {
        document.getElementById('5Day').hidden = false;
        document.getElementById('3Hour').hidden = true;
        document.getElementById('5DayNav').className = 'nav-link active';
        document.getElementById('3HourNav').className = 'nav-link';
    }
}