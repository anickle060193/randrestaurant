namespace Restaurants
{
    export function initSearchMap()
    {
        console.log( 'Restaurants.initSearchMap()' );

        let mapElement = $( '#restaurant-search-map' ).throwIfEmpty();
        new SearchMap.SearchMap( mapElement[ 0 ], {
            placeInfoWindowContentCreator: function( place )
            {
                let div = document.createElement( 'div' );
                div.innerHTML = `
                    <center>
                        <b><a href="/${place.place_id}">${place.name}</a></b>
                        <br>
                        ${place.vicinity}
                    </center>`;
                return <HTMLElement>div.firstElementChild;
            }
        } );
    }

    export function initShowMap()
    {
        console.log( 'Restaurants.initShowMap()' );

        let mapElement = $( '#restaurant-map' ).throwIfEmpty();
        let restaurantLocation = <google.maps.LatLngLiteral>mapElement.data( 'location' );
        let map = new google.maps.Map( mapElement[ 0 ], {
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