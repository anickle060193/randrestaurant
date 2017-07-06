namespace Restaurants
{
    export function initSearchMap()
    {
        console.log( 'Restaurants.initSearchMap()' );

        let mapElement: HTMLElement = document.getElementById( 'restaurant-search-map' );
        SearchMap.createSearchMap( mapElement, function( place )
        {
            let div = document.createElement( 'div' );
            div.innerHTML = `
                <center>
                    <b><a href="/${place.place_id}">${place.name}</a></b>
                    <br>
                    ${place.vicinity}
                </center>`;
            return div.firstElementChild;
        } );
    }

    export function initShowMap()
    {
        console.log( 'Restaurants.initShowMap()' );

        let mapElement = document.getElementById( 'restaurant-map' );
        let restaurantLocation = <google.maps.LatLngLiteral>JSON.parse( mapElement.dataset.location );
        let map = new google.maps.Map( mapElement, {
            center: restaurantLocation,
            zoom: 15,
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        } );

        new google.maps.Marker( {
            map: map,
            position: restaurantLocation
        } );

        google.maps.event.addDomListener( window, 'resize', function()
        {
            map.setCenter( restaurantLocation );
        } );
    }
}

RandRestaurant.pageReady( 'restaurants', 'search', function()
{
    Restaurants.initSearchMap();
} );

RandRestaurant.pageReady( 'restaurants', 'show', function()
{
    Restaurants.initShowMap();
} );