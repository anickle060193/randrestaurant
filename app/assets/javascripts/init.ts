/// <reference types="jquery" />

namespace RandRestaurant
{
    export function init()
    {
        return;
    }

    export function ready( callback: any )
    {
        $( document ).on( 'turbolinks:load', callback );
    }

    export function pageReady( controller: string, action: string, callback: any )
    {
        ready( function()
        {
            let selector = "[data-controller='#{controller}'][data-action='#{action}']"
            if( $( selector ).length > 0 )
            {
                callback()
            }
        } );
    }
}

RandRestaurant.ready( function()
{
    RandRestaurant.init();
} );