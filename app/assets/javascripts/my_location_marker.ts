class MyLocationMarker extends google.maps.OverlayView
{
    private map: google.maps.Map;
    private svg: SVGSVGElement = null;
    private position: google.maps.LatLng = null;
    private accuracy: number = 0;
    private firstPosition: boolean = true;

    constructor( map: google.maps.Map )
    {
        super();

        this.setMap( map );
    }

    private onWatchPositionSuccess( position: Position )
    {
        let coords = new google.maps.LatLng( position.coords.latitude, position.coords.longitude );
        this.position = coords;
        this.accuracy = position.coords.accuracy;
        this.draw();

        if( this.firstPosition )
        {
            this.firstPosition = false;
            this.map.setCenter( coords );
        }
    }

    private onWatchPositionError( error: PositionError )
    {
        console.error( error );
        
        this.position = null;
        this.accuracy = 0;
        this.draw();
    }

    setMap( map: google.maps.Map )
    {
        this.map = map;
        super.setMap( this.map );
    }

    onAdd()
    {
        let div = document.createElement( 'div' );
        div.innerHTML = `
            <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg" style="position:relative;">
                <circle cx="50" cy="50" r="49" fill="blue" fill-opacity="0.1" />
                <circle cx="50" cy="50" r="20" fill="blue" fill-opacity="0.85" stroke="white" stroke-width="8" />
            </svg>
        `;

        this.svg = <SVGSVGElement>div.firstElementChild;
        this.getPanes().mapPane.appendChild( this.svg );

        if( navigator.geolocation )
        {
            navigator.geolocation.watchPosition
            (
                ( position ) => this.onWatchPositionSuccess( position ),
                ( error ) => this.onWatchPositionError( error )
            );
        }
    }

    draw()
    {
        if( this.position )
        {
            let projection = this.getProjection();

            let center = projection.fromLatLngToDivPixel( this.position );

            let size = 30;
            this.svg.style.width = size + 'px';
            this.svg.style.height = size + 'px';
            this.svg.style.left = ( center.x - size / 2 ) + 'px';
            this.svg.style.top = ( center.y - size / 2 ) + 'px';

            this.svg.style.visibility = 'visible';
        }
        else
        {
            this.svg.style.visibility = 'hidden';
        }
    }

    onRemove()
    {
        this.svg.parentElement.removeChild( this.svg );
    }
}