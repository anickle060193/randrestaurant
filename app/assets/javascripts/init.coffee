window.RandRestaurant ||= { }

RandRestaurant.init = ->
  return

RandRestaurant.ready = ( callback ) ->
  $( document ).on( "turbolinks:load", callback )

RandRestaurant.pageReady = ( controller, action, callback ) ->
  RandRestaurant.ready ->
    selector = "[data-controller='#{controller}'][data-action='#{action}']"
    callback() if $( selector ).length > 0

RandRestaurant.ready ->
  RandRestaurant.init()