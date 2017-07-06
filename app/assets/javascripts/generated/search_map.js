"use strict";
var SearchMap;
(function (SearchMap) {
    function createSearchMap(mapElement, onShowInfoWindowCallback) {
        console.log('SearchMap.createSearchMap()');
        var map = new google.maps.Map(mapElement, {
            center: { lat: 39.0915837, lng: -94.8559123 },
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            streetViewControl: false
        });
        var infoWindow = new google.maps.InfoWindow();
        var placesService = new google.maps.places.PlacesService(map);
        var myLocationMarker = new MyLocationMarker(map);
        google.maps.event.addDomListenerOnce(window, 'turbolinks:before-render', function () {
            myLocationMarker.setMap(null);
        });
        var mapSearchInput = document.createElement('input');
        mapSearchInput.type = 'text';
        mapSearchInput.placeholder = 'Search for restaurants...';
        mapSearchInput.style.width = '80%';
        mapSearchInput.style.margin = '10px';
        mapSearchInput.classList.add('form-control');
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
                        if (status === google.maps.places.PlacesServiceStatus.OK) {
                            var infoWindowContent = onShowInfoWindowCallback(result);
                            infoWindow.setContent(infoWindowContent);
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
    SearchMap.createSearchMap = createSearchMap;
})(SearchMap || (SearchMap = {}));
//# sourceMappingURL=search_map.js.map