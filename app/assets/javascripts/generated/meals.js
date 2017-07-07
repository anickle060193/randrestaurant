"use strict";
var Meals;
(function (Meals) {
    var newPossibleRestaurantForm;
    var newPossibleRestaurantPlaceIdInput;
    function initShowFirst() {
        console.log('Meals.initShowFirst()');
        newPossibleRestaurantForm = $('#new-possible-restaurant-form').remove().removeClass('hidden');
        newPossibleRestaurantPlaceIdInput = $(newPossibleRestaurantForm).find('#new-possible-restaurant-place-id-input');
    }
    Meals.initShowFirst = initShowFirst;
    function initShow() {
        console.log('Meals.initShow()');
        var mapElement = $('#meal-search-map').throwIfEmpty();
        var possiblePlaces = mapElement.data('possible-restaurants');
        SearchMap.createSearchMap(mapElement[0], function (place) {
            var infoWindowContent = $('<center>')
                .append($('<b>').text(place.name))
                .append($('<br>'))
                .append(place.vicinity);
            if (possiblePlaces.indexOf(place.place_id) === -1) {
                newPossibleRestaurantPlaceIdInput.val(place.place_id);
                infoWindowContent.append(newPossibleRestaurantForm);
            }
            return infoWindowContent[0];
        });
    }
    Meals.initShow = initShow;
})(Meals || (Meals = {}));
RandRestaurant.pageReadyFirst('meals', 'show', Meals.initShowFirst);
RandRestaurant.pageReady('meals', 'show', Meals.initShow);
//# sourceMappingURL=meals.js.map