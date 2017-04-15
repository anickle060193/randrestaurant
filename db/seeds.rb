Restaurant.where( "name ILIKE :name", name: "Restaurant%" ).destroy_all

50.times do |i|
  Restaurant.create!( name: "Restaurant #{i}" )
end