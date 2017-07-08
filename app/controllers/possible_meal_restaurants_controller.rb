class PossibleMealRestaurantsController < ApplicationController
  before_action :authenticate_user!

  def create
    @meal = Meal.find( params[ :meal_id ] )
    @added_possible_restaurant = Restaurant.from_place_id( params[ :place_id ] )
    @meal.possible_restaurants << @added_possible_restaurant unless @meal.possible_restaurants.exists?( @added_possible_restaurant.id )

    respond_to do |format|
      format.html { redirect_to @meal }
      format.js
    end
  end

  def destroy
    possible_meal_restaurant = PossibleMealRestaurant.find_by( id: params[ :id ] )
    if possible_meal_restaurant.present?
      PossibleMealRestaurant.transaction do
        @meal = possible_meal_restaurant.meal
        @removed_possible_restaurant = possible_meal_restaurant.restaurant

        possible_meal_restaurant.destroy!

        if @removed_possible_restaurant == @meal.restaurant
          @meal.restaurant = nil
          @meal.save!
          redirect_to @meal
          return
        end
      end
    else
      @meal = Meal.find( params[ :meal_id ] )
      @removed_possible_restaurant = Restaurant.find( params[ :restaurant_id ] )
    end

    respond_to do |format|
      format.html { redirect_to @meal }
      format.js
    end
  end

end
