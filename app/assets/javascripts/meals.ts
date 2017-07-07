namespace Meals
{
    let newPossibleRestaurantForm: JQuery<HTMLElement>;
    let newPossibleRestaurantPlaceIdInput: JQuery<HTMLElement>;

    export function initShowFirst()
    {
        console.log( 'Meals.initShowFirst()' );

        newPossibleRestaurantForm = $( '#new-possible-restaurant-form' ).remove().removeClass( 'hidden' );
        newPossibleRestaurantPlaceIdInput = $( newPossibleRestaurantForm ).find( '#new-possible-restaurant-place-id-input' );
    }

    export function initShow()
    {
        console.log( 'Meals.initShow()' );

        let mapElement = $( '#meal-search-map' ).throwIfEmpty();
        let possiblePlaces = <Array<string>>mapElement.data( 'possible-restaurants' );

        SearchMap.createSearchMap( mapElement[ 0 ], function( place )
        {
            let infoWindowContent = $( '<center>' )
                    .append( $( '<b>' ).text( place.name ) )
                    .append( $( '<br>' ) )
                    .append( place.vicinity );
            if( possiblePlaces.indexOf( place.place_id ) === -1 )
            {
                newPossibleRestaurantPlaceIdInput.val( place.place_id );
                infoWindowContent.append( newPossibleRestaurantForm )
            }
            return infoWindowContent[ 0 ];
        } );
    }
}

RandRestaurant.pageReadyFirst( 'meals', 'show', Meals.initShowFirst );
RandRestaurant.pageReady( 'meals', 'show', Meals.initShow );