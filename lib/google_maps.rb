class GoogleMaps
    include HTTParty
    base_uri 'https://maps.googleapis.com/maps/api'
    default_params key: Rails.application.secrets.google_maps_api_key_server
    default_options.update( verify: false )

    def place_details( place_id )
        Rails.cache.fetch( place_id, expires_in: 30.days ) do
            self.class.get( '/place/details/json', query: { placeid: place_id } )[ 'result' ]
        end
    end
end