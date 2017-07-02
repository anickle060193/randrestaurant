/// <reference types="leaflet" />
RandRestaurant.ready(function () {
    var map = L.map('restaurant-map');
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(function (position) {
            var coords = [position.coords.latitude, position.coords.longitude];
            map.setView(coords, 13);
            var marker = L.marker(coords).addTo(map);
        });
    }
    L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
        attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, <a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="http://mapbox.com">Mapbox</a>',
        maxZoom: 18,
        id: 'mapbox.streets',
        accessToken: 'pk.eyJ1IjoiYW5pY2tsZTA2MDE5MyIsImEiOiJjajRreDlkbmUwbzFzMzNwbHpiYjllZDZiIn0.FryduFmbJWsVY8w4uodMVg'
    }).addTo(map);
});
//# sourceMappingURL=restaurants.js.map