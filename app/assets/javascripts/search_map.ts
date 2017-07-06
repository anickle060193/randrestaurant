namespace SearchMap
{
    interface OnShowInfoWindowCallback { ( place: google.maps.places.PlaceResult ) : Element }

    export function createSearchMap( mapElement: HTMLElement, onShowInfoWindowCallback : OnShowInfoWindowCallback )
    {
        console.log( 'SearchMap.createSearchMap()' );

        let map = new google.maps.Map( mapElement, {
            center: { lat: 39.0915837, lng: -94.8559123 },
            zoom: 12,
            mapTypeId: google.maps.MapTypeId.ROADMAP,
            mapTypeControl: true,
            mapTypeControlOptions: {
                style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                position: google.maps.ControlPosition.BOTTOM_CENTER
            },
            streetViewControl: false
        } );

        let infoWindow = new google.maps.InfoWindow();

        let placesService = new google.maps.places.PlacesService( map );

        let myLocationMarker = new MyLocationMarker( map );
        google.maps.event.addDomListenerOnce( window, 'turbolinks:before-render', function()
        {
            myLocationMarker.setMap( null );
        } );

        let mapSearchInput = document.createElement( 'input' );
        mapSearchInput.type = 'text';
        mapSearchInput.placeholder = 'Search for restaurants...';
        mapSearchInput.style.width = '80%';
        mapSearchInput.style.margin = '10px';
        mapSearchInput.classList.add( 'form-control' );

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
                        if( status === google.maps.places.PlacesServiceStatus.OK )
                        {
                            let infoWindowContent = onShowInfoWindowCallback( result );
                            infoWindow.setContent( infoWindowContent );
                            infoWindow.open( map, marker );
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
}