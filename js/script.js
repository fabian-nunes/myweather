//API Key
const key = 'fa4902bd587104b68a518d9b60619cf8';
//Metric or Imperial
let system = readLocalStorageSystem();
//Favorites Stored
let favoriteArray = readLocalStorageFavorites();

//Get System from Local Storage
function readLocalStorageSystem() {
    let system = JSON.parse(localStorage.getItem("system"));
    if (system == null) {
        system = 'metric';
        document.getElementById('metric').className = 'btn btn-link disabled';
        document.getElementById('imperial').className = 'btn btn-link';
    } else if (system === 'metric') {
        document.getElementById('metric').className = 'btn btn-link disabled';
        document.getElementById('imperial').className = 'btn btn-link';
    } else {
        document.getElementById('metric').className = 'btn btn-link';
        document.getElementById('imperial').className = 'btn btn-link disabled';
    }
    return system;
}

//Write System to Local Storage
function writeLocalStorageSystem(system) {
    localStorage.setItem("system", JSON.stringify(system));
    window.location.reload();
}

//Change Tabs dynamically in the HTML Sections using the buttons
function changeTab(tab) {
    switch (tab) {
        //3 Hour Forecast
        case 0:
            document.getElementById('5Day').hidden = true;
            document.getElementById('3Hour').hidden = false;
            document.getElementById('5DayNav').className = 'nav-link rowNav';
            document.getElementById('3HourNav').className = 'nav-link active rowNav';
        break;
        //5 Day Forecast
        case 1:
            document.getElementById('5Day').hidden = false;
            document.getElementById('3Hour').hidden = true;
            document.getElementById('5DayNav').className = 'nav-link active rowNav';
            document.getElementById('3HourNav').className = 'nav-link rowNav';
        break;
        //All Cities
        case 2:
            document.getElementById('weatherCards').hidden = false;
            document.getElementById('favoriteCards').hidden = true;
            document.getElementById('currentLocation').hidden = true;
            document.getElementById('all').className = 'nav-link active rowNav';
            document.getElementById('fav').className = 'nav-link rowNav';
            document.getElementById('current').className = 'nav-link rowNav';
        break;
        //Favorites
        case 3:
            document.getElementById('weatherCards').hidden = true;
            document.getElementById('favoriteCards').hidden = false;
            document.getElementById('currentLocation').hidden = true;
            document.getElementById('all').className = 'nav-link rowNav';
            document.getElementById('fav').className = 'nav-link active rowNav';
            document.getElementById('current').className = 'nav-link rowNav';
        break;
        //Current Location
        case 4:
            document.getElementById('weatherCards').hidden = true;
            document.getElementById('favoriteCards').hidden = true;
            document.getElementById('currentLocation').hidden = false;
            document.getElementById('all').className = 'nav-link rowNav';
            document.getElementById('fav').className = 'nav-link rowNav';
            document.getElementById('current').className = 'nav-link active rowNav';
        break;

    }

}

//Get Favorites array from Local Storage
function readLocalStorageFavorites() {
    let favorites = JSON.parse(localStorage.getItem("favorites"));
    if (favorites == null) {
        favorites = [];
    }
    return favorites;
}

//Write Favorites array to Local Storage
function writeLocalStorageFavorites(id) {
    favoriteArray.push(id);
    localStorage.setItem("favorites", JSON.stringify(favoriteArray));
    window.location.reload();
}

//Remove Favorites from Local Storage
function removeLocalStorageFavorites(id) {
    favoriteArray = favoriteArray.filter(item => item !== id);
    localStorage.setItem("favorites", JSON.stringify(favoriteArray));
    window.location.reload();
}

//Change Favorits Icon to Full or Empty
function changeFavoriteIcon(id, favorite) {
    if (favoriteArray.includes(id)) {
        favorite.src = 'images/favoriteH.png';
        favorite.onclick = function () {
            removeLocalStorageFavorites(id);
        }
    } else {
        favorite.src = 'images/favoriteNH.png';
        favorite.onclick = function () {
            writeLocalStorageFavorites(id);
        }
    }
}