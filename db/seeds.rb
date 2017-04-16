Restaurant.where( "name ILIKE :name", name: "Restaurant%" ).destroy_all

10.times do |i|
  Restaurant.create!( name: "Restaurant #{i}" )
end