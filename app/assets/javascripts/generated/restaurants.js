var Restaurants;
(function (Restaurants) {
    function initNewMap() {
        console.log('Restaurants.initNewMap()');
        var restaurantPlaceIdInput = document.getElementById('restaurant-place-id');
        var mapElement = document.getElementById('restaurant-map');
        var map = new google.maps.Map(mapElement, {
            center: { lat: 39.0915837, lng: -94.8559123 },
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_RIGHT
            }
        });
        var infoWindow = new google.maps.InfoWindow();
        var placesService = new google.maps.places.PlacesService(map);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) {
                var currentPosition = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
                map.setCenter(currentPosition);
                new google.maps.Marker({
                    position: currentPosition,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    map: map
                });
            });
        }
        var mapSearchInput = document.getElementById('map-search');
        $(mapSearchInput).on('keypress keydown keyup', function (e) {
            if (e.keyCode == 13) {
                e.preventDefault();
            }
        });
        var searchBox = new google.maps.places.SearchBox(mapSearchInput);
        map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapSearchInput);
        map.addListener('bounds_changed', function () {
            searchBox.setBounds(map.getBounds());
        });
        var markers = [];
        searchBox.addListener('places_changed', function () {
            var places = searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            for (var _i = 0, markers_1 = markers; _i < markers_1.length; _i++) {
                var marker = markers_1[_i];
                marker.setMap(null);
            }
            markers = [];
            var bounds = new google.maps.LatLngBounds();
            var _loop_1 = function (place) {
                if (!place.geometry) {
                    return { value: void 0 };
                }
                var marker = new google.maps.Marker({
                    map: map,
                    title: place.name,
                    position: place.geometry.location
                });
                markers.push(marker);
                marker.addListener('click', function () {
                    placesService.getDetails({ placeId: place.place_id }, function (result, status) {
                        restaurantPlaceIdInput.setAttribute('value', place.place_id);
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            console.log(result);
                            infoWindow.setContent("\n                                <center>\n                                    <b>" + place.name + "</b>\n                                    <br>\n                                    " + result.vicinity + "\n                                </center>");
                            infoWindow.open(map, marker);
                        }
                    });
                });
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                }
                else {
                    bounds.extend(place.geometry.location);
                }
                map.fitBounds(bounds);
            };
            for (var _a = 0, places_1 = places; _a < places_1.length; _a++) {
                var place = places_1[_a];
                var state_1 = _loop_1(place);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
        });
    }
    Restaurants.initNewMap = initNewMap;
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
//# sourceMappingURL=restaurants.js.map