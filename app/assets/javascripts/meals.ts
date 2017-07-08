namespace Meals
{
    export let searchMap: SearchMap.SearchMap;

    let newPossibleRestaurantForm: JQuery<HTMLElement>;
    let newPossibleRestaurantPlaceIdInput: JQuery<HTMLElement>;

    export function initShowFirst()
    {
        console.log( 'Meals.initShowFirst()' );

        newPossibleRestaurantForm = $( '#new-possible-restaurant-form' ).detach().removeClass( 'hidden' );
        newPossibleRestaurantPlaceIdInput = $( newPossibleRestaurantForm ).find( '#new-possible-restaurant-place-id-input' );
    }

    export function initShow()
    {
        console.log( 'Meals.initShow()' );

        let mapElement = $( '#meal-search-map' ).throwIfEmpty();

        searchMap = new SearchMap.SearchMap( mapElement[ 0 ], {
            placeInfoWindowContentCreator: function( place, isExistingPlace )
            {
                let infoWindowContent = $( '<center>' )
                        .append( $( '<b>' ).text( place.name ) )
                        .append( $( '<br>' ) )
                        .append( place.vicinity );
                if( !isExistingPlace )
                {
                    newPossibleRestaurantPlaceIdInput.val( place.place_id );
                    infoWindowContent.append( newPossibleRestaurantForm )
                }
                return infoWindowContent[ 0 ];
            },
            existingPlaces: mapElement.data( 'possible-restaurants' )
        } );
    }
}

RandRestaurant.pageReadyFirst( 'meals', 'show', Meals.initShowFirst );
RandRestaurant.pageReady( 'meals', 'show', Meals.initShow );