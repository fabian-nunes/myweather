//Onload function
$(document).ready(function() {
    const query = window.location.search;
    const urlParams = new URLSearchParams(query);
    const city = urlParams.get('city');

    let weather = getWeather(city);
    weather.then(data => {
        const city = document.getElementById('city');
        city.innerHTML = data.name;
        document.title = data.name;

        let favorite = document.getElementById('favorite');
        changeFavoriteIcon(data.id, favorite);

        //const country = document.getElementById('country');
        //country.innerHTML = data.sys.country;

        const hourDate = document.getElementById('hourDate');
        const date = new Date(data.dt * 1000);
        hourDate.innerHTML = date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() + '-' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate();

        const temp = document.getElementById('temp');
        if (system === 'metric') {
            temp.innerHTML = data.main.temp + 'ºC';
        } else {
            temp.innerHTML = data.main.temp + 'ºF';
        }

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

        const sunrise = document.getElementById('rise');
        const sunriseDate = new Date(data.sys.sunrise * 1000);
        sunrise.innerHTML = sunriseDate.getHours() + ':' + (sunriseDate.getMinutes()<10?'0':'') + sunriseDate.getMinutes();

        const sunset = document.getElementById('set');
        const sunsetDate = new Date(data.sys.sunset * 1000);
        sunset.innerHTML = sunsetDate.getHours() + ':' + (sunsetDate.getMinutes()<10?'0':'') + sunsetDate.getMinutes();

        weatherIcon.src = 'http://openweathermap.org/img/wn/' + data.weather[0].icon + '@2x.png';
    });

    weather = getWeatherForecast(city);
    weather.then(data => {
        const dateFirst = data.list[0].dt;
        data.list.forEach(element => {
            if (element.dt === dateFirst || element.dt === dateFirst + 86400 || element.dt === dateFirst + 86400 * 2 || element.dt === dateFirst + 86400 * 3 || element.dt === dateFirst + 86400 * 4) {
                createWeatherCard(element, '5DayRow', city);
            }

        });

        weather.then(data => {
            const dateFirst = new Date(data.list[0].dt * 1000).getDate();
            data.list.forEach(element => {
                let date = new Date(element.dt * 1000).getDate();
                if (date === dateFirst) {
                    createWeatherCard(element, '3HourRow', city);
                }
            });
        });
    });
});

//Get request to the API to get the forecast
async function getWeatherForecast(id) {
    const base = 'https://api.openweathermap.org/data/2.5/forecast';
    const query = `?id=${id}&units=${system}&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}

//Get request to the API to get the weather
async function getWeather(id) {
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?id=${id}&units=${system}&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}

//Create the weather card dynamically
function createWeatherCard(element, row, id) {
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

    let date = new Date(element.dt * 1000);
    cardHeader.innerHTML = date.getHours() + ':' + (date.getMinutes()<10?'0':'') + date.getMinutes() + '-' + date.toLocaleString('default', { month: 'long' }) + ' ' + date.getDate();
    if (row === '5DayRow') {
        cardHeader.className = 'card-header cardHeader w-100';
        cardHeader.onclick = function() {
            changeDay(id, new Date(element.dt * 1000).getDate());
        }
    } else {
        cardHeader.className = 'card-header w-100';
    }
    card.insertAdjacentElement('beforeend', cardHeader);

    //Create <img src="http://openweathermap.org/img/w/03d.png" class="card-img-bottom weatherImg" alt="weather" data-bs-toggle="tooltip" data-bs-placement="top" title="Tooltip on top">
    let weatherImg = document.createElement('img');
    weatherImg.className = 'card-img-bottom weatherImg';
    weatherImg.src = 'http://openweathermap.org/img/wn/' + element.weather[0].icon + '@2x.png';
    weatherImg.alt = 'weather';
    weatherImg.title = element.weather[0].description;
    weatherImg.setAttribute('data-bs-toggle', 'tooltip');
    weatherImg.setAttribute('data-bs-placement', 'top');
    card.insertAdjacentElement('beforeend', weatherImg);

    //Create <p>Temp: 20ºC</p>
    let temp = document.createElement('p');
    if (system === 'metric') {
        temp.innerHTML = 'Temp: ' + element.main.temp + 'ºC';
    } else {
        temp.innerHTML = 'Temp: ' + element.main.temp + 'ºF';
    }
    card.insertAdjacentElement('beforeend', temp);
}

//Change the day of the 3 hour forecast cards
function changeDay(city, dateFirst) {
    let weather = getWeatherForecast(city);

    weather.then(data => {
        document.getElementById('3HourRow').replaceChildren();
        data.list.forEach(element => {
            let date = new Date(element.dt * 1000).getDate();
            if (date === dateFirst) {
                createWeatherCard(element, '3HourRow');
            }
        });
    });

    Swal.fire({
        title: 'Changed Day!',
        html: 'Now showing the weather for the day ' + dateFirst,
        position: 'top',
        timer: 2000,
        timerProgressBar: true,

    }).then((result) => {
        /* Read more about handling dismissals below */
        if (result.dismiss === Swal.DismissReason.timer) {
            console.log('I was closed by the timer')
        }
    })
}