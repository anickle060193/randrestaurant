"use strict";
var SearchMap;
(function (SearchMap_1) {
    var MARKER_PLACE_KEY = 'rand_restaurant.marker.place';
    var SearchMap = (function () {
        function SearchMap(mapElement, options) {
            var _this = this;
            console.log('SearchMap.Map()');
            if (options) {
                this.placeInfoWindowContentCreator = options.placeInfoWindowContentCreator;
                if (options.existingPlaces) {
                    this.existingPlaces = options.existingPlaces;
                }
                else {
                    this.existingPlaces = [];
                }
            }
            this.map = new google.maps.Map(mapElement, {
                center: { lat: 39.0915837, lng: -94.8559123 },
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                streetViewControl: false,
                fullscreenControl: false
            });
            this.infoWindow = new google.maps.InfoWindow();
            this.placesService = new google.maps.places.PlacesService(this.map);
            var mapSearchInput = document.createElement('input');
            mapSearchInput.type = 'text';
            mapSearchInput.placeholder = 'Search for restaurants...';
            mapSearchInput.style.width = '80%';
            mapSearchInput.style.margin = '10px';
            mapSearchInput.classList.add('form-control');
            this.searchBox = new google.maps.places.SearchBox(mapSearchInput);
            this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapSearchInput);
            this.map.addListener('bounds_changed', function () { return _this.onMapBoundsChange(); });
            this.markers = [];
            this.searchBox.addListener('places_changed', function () { return _this.onSearchBoxPlacesChanged(); });
            if (this.existingPlaces.length > 0) {
                var bounds = new google.maps.LatLngBounds();
                var _loop_1 = function (existingPlace) {
                    if (!existingPlace.geometry) {
                        return { value: void 0 };
                    }
                    var marker = new google.maps.Marker({
                        map: this_1.map,
                        title: existingPlace.name,
                        position: existingPlace.geometry.location,
                        icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
                    });
                    marker.set(MARKER_PLACE_KEY, existingPlace);
                    marker.addListener('click', function () { return _this.onMarkerClicked(marker, true); });
                    if (existingPlace.geometry.viewport) {
                        var viewport = existingPlace.geometry.viewport;
                        bounds.union(new google.maps.LatLngBounds(viewport.southwest, viewport.northeast));
                    }
                    else {
                        bounds.extend(existingPlace.geometry.location);
                    }
                };
                var this_1 = this;
                for (var _i = 0, _a = this.existingPlaces; _i < _a.length; _i++) {
                    var existingPlace = _a[_i];
                    var state_1 = _loop_1(existingPlace);
                    if (typeof state_1 === "object")
                        return state_1.value;
                }
                this.map.fitBounds(bounds);
            }
            this.myLocationMarker = new MyLocationMarker(this.map, this.existingPlaces.length === 0);
            google.maps.event.addDomListenerOnce(window, 'turbolinks:before-render', function () { return _this.onTurbolinksBeforeRender(); });
        }
        SearchMap.prototype.onTurbolinksBeforeRender = function () {
            this.myLocationMarker.setMap(null);
        };
        SearchMap.prototype.onMapBoundsChange = function () {
            this.searchBox.setBounds(this.map.getBounds());
        };
        SearchMap.prototype.onSearchBoxPlacesChanged = function () {
            var _this = this;
            console.log('onSearchBoxPlacesChanged');
            var places = this.searchBox.getPlaces();
            if (places.length == 0) {
                return;
            }
            for (var _i = 0, _a = this.markers; _i < _a.length; _i++) {
                var marker = _a[_i];
                marker.setMap(null);
            }
            this.markers = [];
            var bounds = new google.maps.LatLngBounds();
            var _loop_2 = function (place) {
                if (!place.geometry) {
                    return "continue";
                }
                if (this_2.existingPlaces.some(function (ep) { return ep.place_id === place.place_id; })) {
                    return "continue";
                }
                var marker = new google.maps.Marker({
                    map: this_2.map,
                    title: place.name,
                    position: place.geometry.location
                });
                marker.setMap(this_2.map);
                marker.set(MARKER_PLACE_KEY, place);
                this_2.markers.push(marker);
                marker.addListener('click', function () { return _this.onMarkerClicked(marker, false); });
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                }
                else {
                    bounds.extend(place.geometry.location);
                }
                this_2.map.fitBounds(bounds);
            };
            var this_2 = this;
            for (var _b = 0, places_1 = places; _b < places_1.length; _b++) {
                var place = places_1[_b];
                _loop_2(place);
            }
        };
        SearchMap.prototype.onMarkerClicked = function (marker, isExistingPlace) {
            var _this = this;
            if (this.placeInfoWindowContentCreator) {
                var place = marker.get(MARKER_PLACE_KEY);
                this.placesService.getDetails({ placeId: place.place_id }, function (result, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        if (_this.placeInfoWindowContentCreator) {
                            var infoWindowContent = _this.placeInfoWindowContentCreator(result, isExistingPlace);
                            _this.infoWindow.setContent(infoWindowContent);
                            _this.infoWindow.open(_this.map, marker);
                        }
                    }
                });
            }
        };
        return SearchMap;
    }());
    SearchMap_1.SearchMap = SearchMap;
})(SearchMap || (SearchMap = {}));
//# sourceMappingURL=search_map.js.map