class RestaurantLikesController < ApplicationController
  before_action :authenticate_user!

  def create
    restaurant = Restaurant.find( params[ :restaurant_id ] )
    current_user.like( restaurant ) unless current_user.likes?( restaurant )
    redirect_to restaurant
  end

  def destroy
    restaurant_like = RestaurantLike.find_by( id: params[ :id ] )
    if restaurant_like.present?
      restaurant_like.user.unlike( restaurant_like.restaurant ) if restaurant_like.user == current_user
      redirect_to restaurant_like.restaurant
    else
      redirect_to Restaurant.find( params[ :restaurant_id ] )
    end
  end

end
