RandRestaurant.map = ( ->
  mapCallbacks = [ ]

  addCallback = ( callback ) ->
    mapCallbacks.push( callback )

  callback = ->
    mapCallbacks.forEach(  ( callback ) ->
      callback() )

  clearCallbacks = ->
    mapCallbacks = [ ]

  { addCallback, callback, clearCallbacks }
)()

RandRestaurant.ready ->
  RandRestaurant.map.clearCallbacks()
  google.maps.event.addDomListener( window, "turbolinks:load", RandRestaurant.map.callback )