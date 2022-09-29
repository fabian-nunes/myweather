

const leiriaID = '2267095';
const lisboaID = '2267057';
const portoID = '2735943';
const coimbraID = '2740637';
const oliveiraID = '2737038';
const viseuID = '2732265'

const idArray = [leiriaID, oliveiraID, lisboaID, portoID, coimbraID, viseuID];

async function getWeather(id) {
    const base = 'https://api.openweathermap.org/data/2.5/weather';
    const query = `?id=${id}&units=${system}&appid=${key}`;
    const response = await fetch(base + query);
    return await response.json();
}

$( document ).ready(function() {

    getWeatherCards(idArray, 'weatherCards');
    getWeatherCards(favoriteArray, 'favoriteCards');
});


function getWeatherCards(data, row) {
    const cards = document.getElementById(row);

    for (let i = 0; i < data.length; i++) {
        let weather = getWeather(data[i]);
        weather.then(data => {
            //Create <div class="row py-lg-5">
            let row = document.createElement('div');
            row.className = 'row py-lg-5 cardRow';
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
            let favorite = document.createElement('img');
            changeFavoriteIcon(data.id, favorite);
            favorite.className = 'favoriteSmall';
            favorite.alt = 'favorite';
            colInside.insertAdjacentElement('beforeend', favorite);
        });
    }
}

$("#weatherSearch").on("keyup", function() {
    var value = $(this).val().toLowerCase();
    $(".cardRow").filter(function() {
        $(this).toggle($(this).attr('id').toLowerCase().indexOf(value) > -1)
    });
});

