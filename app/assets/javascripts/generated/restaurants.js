"use strict";
var Restaurants;
(function (Restaurants) {
    function initSearchMap() {
        console.log('Restaurants.initSearchMap()');
        var mapElement = document.getElementById('restaurant-search-map');
        SearchMap.createSearchMap(mapElement, function (place) {
            var div = document.createElement('div');
            div.innerHTML = "\n                <center>\n                    <b><a href=\"/" + place.place_id + "\">" + place.name + "</a></b>\n                    <br>\n                    " + place.vicinity + "\n                </center>";
            return div.firstElementChild;
        });
    }
    Restaurants.initSearchMap = initSearchMap;
    function initShowMap() {
        console.log('Restaurants.initShowMap()');
        var mapElement = document.getElementById('restaurant-map');
        var restaurantLocation = JSON.parse(mapElement.dataset.location);
        var map = new google.maps.Map(mapElement, {
            center: restaurantLocation,
            zoom: 15,
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        });
        new google.maps.Marker({
            map: map,
            position: restaurantLocation
        });
        google.maps.event.addDomListener(window, 'resize', function () {
            map.setCenter(restaurantLocation);
        });
    }
    Restaurants.initShowMap = initShowMap;
})(Restaurants || (Restaurants = {}));
RandRestaurant.pageReady('restaurants', 'search', function () {
    Restaurants.initSearchMap();
});
RandRestaurant.pageReady('restaurants', 'show', function () {
    Restaurants.initShowMap();
});
//# sourceMappingURL=restaurants.js.map