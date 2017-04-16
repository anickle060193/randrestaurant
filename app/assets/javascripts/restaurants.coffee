RandRestaurant.restaurants = ( ->
  map = null
  service = null
  infoWindow = null
  markers = [ ]

  createMarker = ( place ) ->
    placeLoc = place.geometry.location
    marker = new google.maps.Marker( {
      map: map,
      position: place.geometry.location
    } )
    markers.push( marker )

    google.maps.event.addListener marker, 'click', ->
      infoWindow.setContent( place.name )
      infoWindow.open( map, this )

  searchCallback = ( results, status ) ->
    console.log( status )
    console.log( results )
    if status == google.maps.places.PlacesServiceStatus.OK
      results.forEach( createMarker )

  search = ( s )->
    console.log( "Search: " + s )

    markers.forEach ( marker ) ->
      marker.setMap( null )
    markers = [ ]

    request = {
      location: new google.maps.LatLng( 38.917219, -94.753628 ),
      radius: 500,
      query: s
    }
    service.textSearch( request, searchCallback )

  init = ->
    olathe = new google.maps.LatLng( 38.917219, -94.753628 )

    map = new google.maps.Map( document.getElementById( 'restaurants-map' ), {
      center: olathe,
      zoom: 13
    } )

    infoWindow = new google.maps.InfoWindow()
    service = new google.maps.places.PlacesService( map )

  { init, search }
)()

RandRestaurant.pageReady "restaurants", "index", ->
  RandRestaurant.map.addCallback( RandRestaurant.restaurants.init )