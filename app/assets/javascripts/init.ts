namespace RandRestaurant
{
    export function init()
    {
    }

    export function ready( callback: any )
    {
        $( document ).on( 'turbolinks:load', callback );
    }

    export function readyFirst( callback: any )
    {
        $( document ).one( 'turbolinks:load', callback );
    }

    function createPageReadyCallback( controller: string, action: string, callback: any )
    {
        return function()
        {
            let selector = `[data-controller="${controller}"][data-action="${action}"]`;
            if( $( selector ).length > 0 )
            {
                callback()
            }
        };
    }

    export function pageReady( controller: string, action: string, callback: any )
    {
        ready( createPageReadyCallback( controller, action, callback ) );
    }

    export function pageReadyFirst( controller: string, action: string, callback: any )
    {
        readyFirst( createPageReadyCallback( controller, action, callback ) );
    }
}

RandRestaurant.ready( function()
{
    RandRestaurant.init();
} );