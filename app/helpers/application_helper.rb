module ApplicationHelper

  def navbar_link_tag( s, link )
    content_tag( :li, link_to( s, link ), class: ( "active" if current_page?( link ) ) )
  end

  def google_maps_api_tag
    api_key = Rails.application.secrets.google_maps_api_key_client
    url = "https://maps.googleapis.com/maps/api/js?key=#{api_key}&libraries=places"
    javascript_include_tag( url, data: { turbolinks_track: 'reload' } )
  end

end
