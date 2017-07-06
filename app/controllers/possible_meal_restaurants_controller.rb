class PossibleMealRestaurantsController < ApplicationController
  before_action :authenticate_user!

  def create
    meal = Meal.find( params[ :meal_id ] )
    restaurant = Restaurant.from_place_id( params[ :place_id ] )
    meal.possible_locations << restaurant unless meal.possible_locations.exists?( restaurant.id )
    redirect_to meal
  end

  def destroy
    possible_meal_restaurant = PossibleMealRestaurant.find_by( id: params[ :id ] )
    if possible_meal_restaurant.present?
      possible_meal_restaurant.destroy()
      redirect_to possible_meal_restaurant.meal
    else
      redirect_to Meal.find( params[ :meal_id ] )
    end
  end

end
