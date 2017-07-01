/// <reference types="jquery" />
var RandRestaurant;
(function (RandRestaurant) {
    function init() {
        return;
    }
    RandRestaurant.init = init;
    function ready(callback) {
        $(document).on('turbolinks:load', callback);
    }
    RandRestaurant.ready = ready;
    function pageReady(controller, action, callback) {
        ready(function () {
            var selector = "[data-controller='#{controller}'][data-action='#{action}']";
            if ($(selector).length > 0) {
                callback();
            }
        });
    }
    RandRestaurant.pageReady = pageReady;
})(RandRestaurant || (RandRestaurant = {}));
RandRestaurant.ready(function () {
    RandRestaurant.init();
});
//# sourceMappingURL=init.js.map