"use strict";
var Meals;
(function (Meals) {
    function initShow() {
        console.log('Meals.initShow()');
        var newPossibleLocationForm = document.getElementById('new-possible-location-form');
        var newPossibleLocationPlaceIdInput = document.getElementById('new-possible-location-place-id-input');
        newPossibleLocationForm.parentElement.removeChild(newPossibleLocationForm);
        newPossibleLocationForm.classList.remove('hidden');
        var mapElement = document.getElementById('meal-search-map');
        SearchMap.createSearchMap(mapElement, function (place) {
            var div = document.createElement('div');
            div.innerHTML = "\n                <center>\n                    <b>" + place.name + "</b>\n                    <br>\n                    " + place.vicinity + "\n                </center>";
            var center = div.firstElementChild;
            newPossibleLocationPlaceIdInput.setAttribute('value', place.place_id);
            center.appendChild(newPossibleLocationForm);
            return center;
        });
    }
    Meals.initShow = initShow;
})(Meals || (Meals = {}));
RandRestaurant.pageReady('meals', 'show', Meals.initShow);
//# sourceMappingURL=meals.js.map