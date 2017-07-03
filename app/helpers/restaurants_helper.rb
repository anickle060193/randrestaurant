module RestaurantsHelper

    def google_maps_api_tag
        api_key = Rails.application.secrets.google_maps_api_key
        if [ 'new', 'create', 'edit' ].include?( action_name )
            callback = 'Restaurants.initNewMap'
            url = "https://maps.googleapis.com/maps/api/js?key=#{api_key}&libraries=places&callback=#{callback}"
        elsif [ 'show' ].include?( action_name )
            callback = 'Restaurants.initShowMap'
            url = "https://maps.googleapis.com/maps/api/js?key=#{api_key}&callback=#{callback}"
        end
        javascript_include_tag( url, async: true, defer: true, data: { turbolinks_track: 'reload' } ) if callback.present?
    end

end
