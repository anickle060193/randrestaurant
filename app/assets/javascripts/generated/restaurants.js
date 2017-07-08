"use strict";
var Restaurants;
(function (Restaurants) {
    function initSearchMap() {
        console.log('Restaurants.initSearchMap()');
        var mapElement = $('#restaurant-search-map').throwIfEmpty();
        new SearchMap.SearchMap(mapElement[0], {
            placeInfoWindowContentCreator: function (place) {
                var div = document.createElement('div');
                div.innerHTML = "\n                    <center>\n                        <b><a href=\"/" + place.place_id + "\">" + place.name + "</a></b>\n                        <br>\n                        " + place.vicinity + "\n                    </center>";
                return div.firstElementChild;
            }
        });
    }
    Restaurants.initSearchMap = initSearchMap;
    function initShowMap() {
        console.log('Restaurants.initShowMap()');
        var mapElement = $('#restaurant-map').throwIfEmpty();
        var restaurantLocation = mapElement.data('location');
        var map = new google.maps.Map(mapElement[0], {
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