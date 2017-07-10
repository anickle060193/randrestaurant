namespace SearchMap
{
    const MARKER_PLACE_KEY = 'rand_restaurant.marker.place';

    export interface PlaceInfoWindowContentCreator { ( place: google.maps.places.PlaceResult, isExistingPlace: boolean ) : Element }

    export interface MapOptions
    {
        placeInfoWindowContentCreator?: PlaceInfoWindowContentCreator;
        existingPlaces?: google.maps.places.PlaceResult[];
        searchingDisabled?: boolean;
    }

    export class SearchMap
    {
        private map: google.maps.Map;
        private infoWindow: google.maps.InfoWindow;
        private placesService: google.maps.places.PlacesService;
        private myLocationMarker: MyLocationMarker;
        private searchBox: google.maps.places.SearchBox;
        private markers: { [ placeId: string ]: google.maps.Marker };

        private placeInfoWindowContentCreator?: PlaceInfoWindowContentCreator;
        private existingPlaces: google.maps.places.PlaceResult[];
        private existingPlaceMarkers: { [ existingPlaceId: string ]: google.maps.Marker };
        private searchingEnabled: boolean;

        constructor( mapElement: HTMLElement, options?: MapOptions )
        {
            console.log( 'SearchMap.Map()' );

            this.searchingEnabled = true;

            if( options )
            {
                this.placeInfoWindowContentCreator = options.placeInfoWindowContentCreator;

                if( options.existingPlaces )
                {
                    this.existingPlaces = options.existingPlaces;
                }
                else
                {
                    this.existingPlaces = [ ];
                }

                this.searchingEnabled = !options.searchingDisabled;
            }

            this.map = new google.maps.Map( mapElement, {
                center: { lat: 39.0915837, lng: -94.8559123 },
                zoom: 12,
                mapTypeId: google.maps.MapTypeId.ROADMAP,
                mapTypeControl: true,
                mapTypeControlOptions: {
                    style: google.maps.MapTypeControlStyle.HORIZONTAL_BAR,
                    position: google.maps.ControlPosition.BOTTOM_CENTER
                },
                streetViewControl: false,
                fullscreenControl: false
            } );

            this.infoWindow = new google.maps.InfoWindow();

            this.placesService = new google.maps.places.PlacesService( this.map );

            if( this.searchingEnabled )
            {
                let mapSearchInput = document.createElement( 'input' );
                mapSearchInput.type = 'text';
                mapSearchInput.placeholder = 'Search for restaurants...';
                mapSearchInput.style.width = '80%';
                mapSearchInput.style.margin = '10px';
                mapSearchInput.classList.add( 'form-control' );

                this.searchBox = new google.maps.places.SearchBox( mapSearchInput );
                this.map.controls[ google.maps.ControlPosition.TOP_CENTER ].push( mapSearchInput );

                this.map.addListener( 'bounds_changed', () => this.onMapBoundsChange() );

                this.markers = { };
                this.searchBox.addListener( 'places_changed', () => this.onSearchBoxPlacesChanged() );
            }

            this.existingPlaceMarkers = { };
            if( this.existingPlaces.length > 0 )
            {
                let bounds = new google.maps.LatLngBounds();
                for( let existingPlace of this.existingPlaces )
                {
                    if( !existingPlace.geometry )
                    {
                        return;
                    }

                    this.addExistingPlaceMarker( existingPlace );

                    if( existingPlace.geometry.viewport )
                    {
                        let viewport = <any>existingPlace.geometry.viewport;
                        bounds.union( new google.maps.LatLngBounds( viewport.southwest, viewport.northeast ) );
                    }
                    else
                    {
                        bounds.extend( existingPlace.geometry.location );
                    }
                }
                this.map.fitBounds( bounds );
            }

            this.myLocationMarker = new MyLocationMarker( this.map, this.existingPlaces.length === 0 );
            google.maps.event.addDomListenerOnce( window, 'turbolinks:before-render', () => this.onTurbolinksBeforeRender() );
        }

        private addExistingPlaceMarker( existingPlace: google.maps.places.PlaceResult )
        {
            let marker = new google.maps.Marker( {
                map: this.map,
                title: existingPlace.name,
                position: existingPlace.geometry.location,
                icon: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png'
            } );
            marker.set( MARKER_PLACE_KEY, existingPlace );
            marker.addListener( 'click', () => this.onMarkerClicked( marker, true ) );
            this.existingPlaceMarkers[ existingPlace.place_id ] = marker;
        }

        private onTurbolinksBeforeRender()
        {
            this.myLocationMarker.setMap( null );
        }

        private onMapBoundsChange()
        {
            this.searchBox.setBounds( <google.maps.LatLngBounds>this.map.getBounds() );
        }

        private onSearchBoxPlacesChanged()
        {
            console.log( 'onSearchBoxPlacesChanged' );

            let places = this.searchBox.getPlaces();
            if( places.length == 0 )
            {
                return;
            }

            for( let placeId in this.markers )
            {
                this.markers[ placeId ].setMap( null );
            }

            this.markers = { };

            let bounds = new google.maps.LatLngBounds();
            for( let place of places )
            {
                if( !place.geometry )
                {
                    continue;
                }

                if( this.existingPlaces.some( ep => ep.place_id === place.place_id ) )
                {
                    continue;
                }

                let marker = new google.maps.Marker( {
                    map: this.map,
                    title: place.name,
                    position: place.geometry.location
                } );
                marker.setMap( this.map );

                marker.set( MARKER_PLACE_KEY, place );
                this.markers[ place.place_id ] = marker;

                marker.addListener( 'click', () => this.onMarkerClicked( marker, false ) );

                if( place.geometry.viewport )
                {
                    bounds.union( place.geometry.viewport );
                }
                else
                {
                    bounds.extend( place.geometry.location );
                }
                this.map.fitBounds( bounds );
            }
        }

        private onMarkerClicked( marker: google.maps.Marker, isExistingPlace: boolean )
        {
            if( this.placeInfoWindowContentCreator )
            {
                let place = marker.get( MARKER_PLACE_KEY );
                this.placesService.getDetails( { placeId: place.place_id }, ( result, status ) =>
                {
                    if( status === google.maps.places.PlacesServiceStatus.OK )
                    {
                        if( this.placeInfoWindowContentCreator )
                        {
                            let infoWindowContent = this.placeInfoWindowContentCreator( result, isExistingPlace );
                            this.infoWindow.setContent( infoWindowContent );
                            this.infoWindow.open( this.map, marker );
                        }
                    }
                } );
            }
        }

        public removeExistingPlace( place_id: string )
        {
            this.existingPlaces = this.existingPlaces.filter( ep => ep.place_id !== place_id );
            if( place_id in this.existingPlaceMarkers )
            {
                let marker = this.existingPlaceMarkers[ place_id ];
                marker.setMap( null );
                delete this.existingPlaceMarkers[ place_id ];
            }
        }

        public addExistingPlace( place_id: string )
        {
            if( !this.existingPlaces.some( ep => ep.place_id === place_id ) )
            {
                this.placesService.getDetails( { placeId: place_id }, ( result, status ) =>
                {
                    if( status === google.maps.places.PlacesServiceStatus.OK )
                    {
                        this.addExistingPlaceMarker( result );
                        if( place_id in this.markers )
                        {
                            let marker = this.markers[ place_id ];
                            marker.setMap( null );
                            delete this.markers[ place_id ];
                        }
                    }
                } );
            }
        }
    }
}