namespace Meals
{
    export function initShow()
    {
        console.log( 'Meals.initShow()' );

        let newPossibleLocationForm = document.getElementById( 'new-possible-location-form' );
        let newPossibleLocationPlaceIdInput = document.getElementById( 'new-possible-location-place-id-input' );

        newPossibleLocationForm.parentElement.removeChild( newPossibleLocationForm );
        newPossibleLocationForm.classList.remove( 'hidden' );

        let mapElement = document.getElementById( 'meal-search-map' );
        SearchMap.createSearchMap( mapElement, function( place )
        {
            let div = document.createElement( 'div' );
            div.innerHTML = `
                <center>
                    <b>${place.name}</b>
                    <br>
                    ${place.vicinity}
                </center>`;
            let center = div.firstElementChild;
            newPossibleLocationPlaceIdInput.setAttribute( 'value', place.place_id );
            center.appendChild( newPossibleLocationForm );
            return center;
        } );
    }
}

RandRestaurant.pageReady( 'meals', 'show', Meals.initShow );