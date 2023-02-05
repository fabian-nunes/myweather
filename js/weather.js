//ID from cities chosen by the author
const leiriaID = '2267095';
const lisboaID = '2267057';
const portoID = '2735943';
const coimbraID = '2740637';
const oliveiraID = '2737038';
const viseuID = '2732265'
const aveiroID = '2742611';
const quarteiraID = '2264299';
const seiaID = '2734215';
const tomarID = '2262644';

//Array of the Ids of the cities
const idArray = [leiriaID, oliveiraID, lisboaID, portoID, coimbraID, viseuID, aveiroID, quarteiraID, seiaID, tomarID];

//Get Request to the API to get a specific city
async function getWeather(id) {
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?id=${id}&units=${system}&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}

//Get Request to the API to get the current location
async function getWeatherByCoords(lat, lon) {
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?lat=${lat}&lon=${lon}&units=${system}&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}

//OnLoad execute the function
$( document ).ready(function() {

    getWeatherCards(idArray, 'weatherCards');
    getWeatherCards(favoriteArray, 'favoriteCards');
    //Put the total number of favorities in the h3
    const total = document.getElementById('total');
    total.innerHTML = "Total cities:" + favoriteArray.length;
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function(position) {
            let lat = position.coords.latitude;
            let lon = position.coords.longitude;
            getWeatherCards([0], 'currentLocation', true, [lat, lon]);
        });
    }
});

//Create the cards with the weather information dynamically
function getWeatherCards(data, row, current = false, [lat, lon] = [0, 0]) {
    const cards = document.getElementById(row);
    let weather;

    for (let i = 0; i < data.length; i++) {
        if (current) {
           weather = getWeatherByCoords(lat, lon);
        } else {
            weather = getWeather(data[i]);
        }
        weather.then(data => {
            //Create <div class="row py-lg-5">
            let row = document.createElement('div');
            if (i <= 5) {
                row.className = 'row py-lg-5 cardRow';
            } else {
                row.className = 'row py-lg-5 cardRow hiddenC';
            }
            row.id = data.name;
            cards.insertAdjacentElement('beforeend', row);

            //Create <div class="col-lg-6 col-md-8 mx-auto">
            let col = document.createElement('div');
            col.className = 'col-lg-6 col-md-8 mx-auto';
            row.insertAdjacentElement('beforeend', col);

            //Create <div class="card">
            let card = document.createElement('div');
            card.className = 'card';
            col.insertAdjacentElement('beforeend', card);

            //Create <div class="card-body">
            let cardBody = document.createElement('div');
            cardBody.className = 'card-body';
            card.insertAdjacentElement('beforeend', cardBody);

            //Create  <div class="row centerVertical">
            let rowInside = document.createElement('div');
            rowInside.className = 'row centerVertical';
            cardBody.insertAdjacentElement('beforeend', rowInside);

            //Create <div class="col-3">
            let colInside = document.createElement('div');
            colInside.className = 'col-3';
            rowInside.insertAdjacentElement('beforeend', colInside);

            //Create <a class="card-title" href='details.html?city=' + data.id;'>City</a>
            let cardTitle = document.createElement('a');
            cardTitle.className = 'card-title';
            cardTitle.innerHTML = data.name;
            cardTitle.href = 'details.html?city=' + data.id;
            colInside.insertAdjacentElement('beforeend', cardTitle);

            //Create <div class="col-3">
            colInside = document.createElement('div');
            colInside.className = 'col-3';
            rowInside.insertAdjacentElement('beforeend', colInside);

            //Create <img src="http://openweathermap.org/img/wn/10d.png" id="icon1" alt="weather">
            let icon = document.createElement('img');
            icon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`;
            icon.alt = 'weather';
            colInside.insertAdjacentElement('beforeend', icon);

            //Create <div class="col-3">
            colInside = document.createElement('div');
            colInside.className = 'col-3';
            rowInside.insertAdjacentElement('beforeend', colInside);

            //Create <h5 class="card-title">Temperature</h5>
            cardTitle = document.createElement('h5');
            cardTitle.className = 'card-title';
            if (system === 'metric') {
                cardTitle.innerHTML = data.main.temp + 'ºC';
            } else {
                cardTitle.innerHTML = data.main.temp + 'ºF';
            }
            colInside.insertAdjacentElement('beforeend', cardTitle);

            //Create <div class="col-3">
            colInside = document.createElement('div');
            colInside.className = 'col-3';
            rowInside.insertAdjacentElement('beforeend', colInside);

            //Create <img src="images/favoriteNH.png" class="favoriteSmall" alt="favorite" onmouseover="hoverFavorite(this)" onmouseout="unhoverFavorite(this)">
            let favorite = document.createElement('i');
            changeFavoriteIcon(data.id, favorite);
            favorite.className = 'fa-solid fa-crown fav';
            colInside.insertAdjacentElement('beforeend', favorite);
        });
    }

}

//Filter the cities by the search bar
$("#weatherSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".cardRow").filter(function() {
        $(this).toggle($(this).attr('id').toLowerCase().indexOf(value) > -1)
    });
});

