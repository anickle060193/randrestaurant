"use strict";
var RandRestaurant;
(function (RandRestaurant) {
    function init() {
    }
    RandRestaurant.init = init;
    function ready(callback) {
        $(document).on('turbolinks:load', callback);
    }
    RandRestaurant.ready = ready;
    function readyFirst(callback) {
        $(document).one('turbolinks:load', callback);
    }
    RandRestaurant.readyFirst = readyFirst;
    function createPageReadyCallback(controller, action, callback) {
        return function () {
            var selector = "[data-controller=\"" + controller + "\"][data-action=\"" + action + "\"]";
            if ($(selector).length > 0) {
                callback();
            }
        };
    }
    function pageReady(controller, action, callback) {
        ready(createPageReadyCallback(controller, action, callback));
    }
    RandRestaurant.pageReady = pageReady;
    function pageReadyFirst(controller, action, callback) {
        readyFirst(createPageReadyCallback(controller, action, callback));
    }
    RandRestaurant.pageReadyFirst = pageReadyFirst;
})(RandRestaurant || (RandRestaurant = {}));
RandRestaurant.ready(function () {
    RandRestaurant.init();
});
//# sourceMappingURL=init.js.map