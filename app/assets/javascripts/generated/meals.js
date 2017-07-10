"use strict";
var Meals;
(function (Meals) {
    var newPossibleRestaurantForm;
    var newPossibleRestaurantPlaceIdInput;
    function initShowFirst() {
        console.log('Meals.initShowFirst()');
        newPossibleRestaurantForm = $('#new-possible-restaurant-form').detach().removeClass('hidden');
        newPossibleRestaurantPlaceIdInput = $(newPossibleRestaurantForm).find('#new-possible-restaurant-place-id-input');
    }
    Meals.initShowFirst = initShowFirst;
    function initShow() {
        console.log('Meals.initShow()');
        var mapElement = $('#meal-search-map').throwIfEmpty();
        Meals.searchMap = new SearchMap.SearchMap(mapElement[0], {
            placeInfoWindowContentCreator: function (place, isExistingPlace) {
                var infoWindowContent = $('<center>')
                    .append($('<b>').text(place.name))
                    .append($('<br>'))
                    .append(place.vicinity);
                if (!isExistingPlace) {
                    newPossibleRestaurantPlaceIdInput.val(place.place_id);
                    infoWindowContent.append(newPossibleRestaurantForm);
                }
                return infoWindowContent[0];
            },
            existingPlaces: mapElement.data('possible-restaurants'),
            searchingDisabled: mapElement.data('searching-disabled')
        });
    }
    Meals.initShow = initShow;
})(Meals || (Meals = {}));
RandRestaurant.pageReadyFirst('meals', 'show', Meals.initShowFirst);
RandRestaurant.pageReady('meals', 'show', Meals.initShow);
//# sourceMappingURL=meals.js.map