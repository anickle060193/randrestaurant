"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var MyLocationMarker = (function (_super) {
    __extends(MyLocationMarker, _super);
    function MyLocationMarker(map) {
        var _this = _super.call(this) || this;
        _this.svg = null;
        _this.watchId = 0;
        _this.position = null;
        _this.accuracy = 0;
        _this.firstPosition = true;
        _this.setMap(map);
        return _this;
    }
    MyLocationMarker.prototype.onWatchPositionSuccess = function (position) {
        var coords = new google.maps.LatLng(position.coords.latitude, position.coords.longitude);
        this.position = coords;
        this.accuracy = position.coords.accuracy;
        this.draw();
        if (this.firstPosition) {
            this.firstPosition = false;
            this.map.setCenter(coords);
        }
    };
    MyLocationMarker.prototype.onWatchPositionError = function (error) {
        console.error(error);
        this.position = null;
        this.accuracy = 0;
        this.draw();
    };
    MyLocationMarker.prototype.setMap = function (map) {
        this.map = map;
        _super.prototype.setMap.call(this, this.map);
    };
    MyLocationMarker.prototype.onAdd = function () {
        var _this = this;
        var div = document.createElement('div');
        div.innerHTML = "\n            <svg viewBox=\"0 0 100 100\" xmlns=\"http://www.w3.org/2000/svg\" style=\"position:relative;\">\n                <circle cx=\"50\" cy=\"50\" r=\"49\" fill=\"blue\" fill-opacity=\"0.1\" />\n                <circle cx=\"50\" cy=\"50\" r=\"20\" fill=\"blue\" fill-opacity=\"0.85\" stroke=\"white\" stroke-width=\"8\" />\n            </svg>\n        ";
        this.svg = div.firstElementChild;
        this.getPanes().mapPane.appendChild(this.svg);
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(function (position) { return _this.onWatchPositionSuccess(position); }, function (error) { return _this.onWatchPositionError(error); });
            this.watchId = navigator.geolocation.watchPosition(function (position) { return _this.onWatchPositionSuccess(position); }, function (error) { return _this.onWatchPositionError(error); });
        }
    };
    MyLocationMarker.prototype.draw = function () {
        if (this.position) {
            var projection = this.getProjection();
            var center = projection.fromLatLngToDivPixel(this.position);
            var size = 30;
            this.svg.style.width = size + 'px';
            this.svg.style.height = size + 'px';
            this.svg.style.left = (center.x - size / 2) + 'px';
            this.svg.style.top = (center.y - size / 2) + 'px';
            this.svg.style.visibility = 'visible';
        }
        else {
            this.svg.style.visibility = 'hidden';
        }
    };
    MyLocationMarker.prototype.onRemove = function () {
        this.svg.parentElement.removeChild(this.svg);
        navigator.geolocation.clearWatch(this.watchId);
    };
    return MyLocationMarker;
}(google.maps.OverlayView));
//# sourceMappingURL=my_location_marker.js.map