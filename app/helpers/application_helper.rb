module ApplicationHelper

  def navbar_link_tag( s, link )
    content_tag( :li, link_to( s, link ), class: ( "active" if current_page?( link ) ) )
  end
  
  def google_maps_api_tag
  end

end
