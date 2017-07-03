namespace Restaurants
{
    export function initNewMap()
    {
        console.log( 'Restaurants.initNewMap()' );

        let restaurantNameInput = document.getElementById( 'restaurant-name' );
        let restaurantLinkInput = document.getElementById( 'restaurant-link' );
        let restaurantPlaceIdInput = document.getElementById( 'restaurant-place-id' );

        let mapElement: HTMLElement = document.getElementById( 'restaurant-map' );
        let map = new google.maps.Map( mapElement, {
            center: { lat: 39.0915837, lng: -94.8559123 },
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_RIGHT
            }
        } );

        let infoWindow = new google.maps.InfoWindow();

        let placesService = new google.maps.places.PlacesService( map );

        if( navigator.geolocation )
        {
            navigator.geolocation.getCurrentPosition( function( position )
            {
                let currentPosition = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
                map.setCenter( currentPosition );
                new google.maps.Marker( {
                    position: currentPosition,
                    icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
                    map: map
                } );
            } );
        }
        
        let mapSearchInput = document.getElementById( 'map-search' ) as HTMLInputElement;
        $( mapSearchInput ).on( 'keypress keydown keyup', function( e )
        {
            if( e.keyCode == 13 )
            {
                e.preventDefault();
            }
        } );
        let searchBox = new google.maps.places.SearchBox( mapSearchInput );
        map.controls[ google.maps.ControlPosition.TOP_CENTER ].push( mapSearchInput );

        map.addListener( 'bounds_changed', function()
        {
            searchBox.setBounds( map.getBounds() );
        } );

        let markers: google.maps.Marker[] = [ ];
        searchBox.addListener( 'places_changed', function()
        {
            let places = searchBox.getPlaces();
            if( places.length == 0 )
            {
                return;
            }

            for( let marker of markers )
            {
                marker.setMap( null );
            }

            markers = [ ];

            let bounds = new google.maps.LatLngBounds();
            for( let place of places )
            {
                if( !place.geometry )
                {
                    return;
                }

                let marker = new google.maps.Marker( {
                    map: map,
                    title: place.name,
                    position: place.geometry.location
                } );
                markers.push( marker );

                marker.addListener( 'click', function()
                {
                    placesService.getDetails( { placeId: place.place_id }, function( result, status )
                    {
                        restaurantNameInput.setAttribute( 'value', place.name );
                        restaurantPlaceIdInput.setAttribute( 'value', place.place_id );

                        if( status === google.maps.places.PlacesServiceStatus.OK )
                        {
                            console.log( result );
                            restaurantLinkInput.setAttribute( 'value', result.website );

                            infoWindow.setContent( `
                                <center>
                                    <b>${place.name}</b>
                                    <br>
                                    ${result.vicinity}
                                </center>`
                            );
                            infoWindow.open( map, marker );
                        }
                        else
                        {
                            restaurantLinkInput.setAttribute( 'value', '' );
                        }
                    } );
                } );
                
                if( place.geometry.viewport )
                {
                    bounds.union( place.geometry.viewport );
                }
                else
                {
                    bounds.extend( place.geometry.location );
                }
                map.fitBounds( bounds );
            }
        } );
    }

    export function initShowMap()
    {
        console.log( 'Restaurants.initShowMap()' );
        
        let mapElement: HTMLElement = document.getElementById( 'restaurant-map' );
        let map: google.maps.Map = new google.maps.Map( mapElement, {
            center: { lat: -34.397, lng: 150.644 },
            zoom: 8,
            disableDefaultUI: true,
            draggable: false,
            zoomControl: false,
            scrollwheel: false,
            disableDoubleClickZoom: true
        } );
    }
}