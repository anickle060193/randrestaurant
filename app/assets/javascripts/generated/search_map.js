"use strict";
var SearchMap;
(function (SearchMap_1) {
    var MARKER_PLACE_KEY = 'rand_restaurant.marker.place';
    var SearchMap = (function () {
        function SearchMap(mapElement, options) {
            var _this = this;
            console.log('SearchMap.Map()');
            this.searchingEnabled = true;
            if (options) {
                this.placeInfoWindowContentCreator = options.placeInfoWindowContentCreator;
                if (options.existingPlaces) {
                    this.existingPlaces = options.existingPlaces;
                }
                else {
                    this.existingPlaces = [];
                }
                this.searchingEnabled = !options.searchingDisabled;
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
            if (this.searchingEnabled) {
                var mapSearchInput = document.createElement('input');
                mapSearchInput.type = 'text';
                mapSearchInput.placeholder = 'Search for restaurants...';
                mapSearchInput.style.width = '80%';
                mapSearchInput.style.margin = '10px';
                mapSearchInput.classList.add('form-control');
                this.searchBox = new google.maps.places.SearchBox(mapSearchInput);
                this.map.controls[google.maps.ControlPosition.TOP_CENTER].push(mapSearchInput);
                this.map.addListener('bounds_changed', function () { return _this.onMapBoundsChange(); });
                this.markers = {};
                this.searchBox.addListener('places_changed', function () { return _this.onSearchBoxPlacesChanged(); });
            }
            this.existingPlaceMarkers = {};
            if (this.existingPlaces.length > 0) {
                var bounds = new google.maps.LatLngBounds();
                for (var _i = 0, _a = this.existingPlaces; _i < _a.length; _i++) {
                    var existingPlace = _a[_i];
                    if (!existingPlace.geometry) {
                        return;
                    }
                    this.addExistingPlaceMarker(existingPlace);
                    if (existingPlace.geometry.viewport) {
                        var viewport = existingPlace.geometry.viewport;
                        bounds.union(new google.maps.LatLngBounds(viewport.southwest, viewport.northeast));
                    }
                    else {
                        bounds.extend(existingPlace.geometry.location);
                    }
                }
                this.map.fitBounds(bounds);
            }
            this.myLocationMarker = new MyLocationMarker(this.map, this.existingPlaces.length === 0);
            google.maps.event.addDomListenerOnce(window, 'turbolinks:before-render', function () { return _this.onTurbolinksBeforeRender(); });
        }
        SearchMap.prototype.addExistingPlaceMarker = function (existingPlace) {
            var _this = this;
            var marker = new google.maps.Marker({
                map: this.map,
                title: existingPlace.name,
                position: existingPlace.geometry.location,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            });
            marker.set(MARKER_PLACE_KEY, existingPlace);
            marker.addListener('click', function () { return _this.onMarkerClicked(marker, true); });
            this.existingPlaceMarkers[existingPlace.place_id] = marker;
        };
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
            for (var placeId in this.markers) {
                this.markers[placeId].setMap(null);
            }
            this.markers = {};
            var bounds = new google.maps.LatLngBounds();
            var _loop_1 = function (place) {
                if (!place.geometry) {
                    return "continue";
                }
                if (this_1.existingPlaces.some(function (ep) { return ep.place_id === place.place_id; })) {
                    return "continue";
                }
                var marker = new google.maps.Marker({
                    map: this_1.map,
                    title: place.name,
                    position: place.geometry.location
                });
                marker.setMap(this_1.map);
                marker.set(MARKER_PLACE_KEY, place);
                this_1.markers[place.place_id] = marker;
                marker.addListener('click', function () { return _this.onMarkerClicked(marker, false); });
                if (place.geometry.viewport) {
                    bounds.union(place.geometry.viewport);
                }
                else {
                    bounds.extend(place.geometry.location);
                }
                this_1.map.fitBounds(bounds);
            };
            var this_1 = this;
            for (var _i = 0, places_1 = places; _i < places_1.length; _i++) {
                var place = places_1[_i];
                _loop_1(place);
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
        SearchMap.prototype.removeExistingPlace = function (place_id) {
            this.existingPlaces = this.existingPlaces.filter(function (ep) { return ep.place_id !== place_id; });
            if (place_id in this.existingPlaceMarkers) {
                var marker = this.existingPlaceMarkers[place_id];
                marker.setMap(null);
                delete this.existingPlaceMarkers[place_id];
            }
        };
        SearchMap.prototype.addExistingPlace = function (place_id) {
            var _this = this;
            if (!this.existingPlaces.some(function (ep) { return ep.place_id === place_id; })) {
                this.placesService.getDetails({ placeId: place_id }, function (result, status) {
                    if (status === google.maps.places.PlacesServiceStatus.OK) {
                        _this.addExistingPlaceMarker(result);
                        if (place_id in _this.markers) {
                            var marker = _this.markers[place_id];
                            marker.setMap(null);
                            delete _this.markers[place_id];
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