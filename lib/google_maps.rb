class GoogleMaps
    include HTTParty
    base_uri 'https://maps.googleapis.com/maps/api'
    default_params key: Rails.application.secrets.google_maps_api_key
    default_options.update( verify: false )

    def place_details( place_id )
        self.class.get('/place/details/json', query: { placeid: place_id } )[ 'result' ]
    end
end