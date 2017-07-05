class RestaurantsController < ApplicationController
  before_action :authenticate_user!, except: [ :search, :show ]

  def search
  end

  def show
    @restaurant = Restaurant.from_place_id( params[ :place_id ] )
  end

end
