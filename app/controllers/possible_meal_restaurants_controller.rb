class PossibleMealRestaurantsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_models
  before_action :correct_user

  def create
    @meal = Meal.find( params[ :meal_id ] )
    @possible_restaurant = Restaurant.from_place_id( params[ :place_id ] )
    @meal.possible_restaurants << @possible_restaurant unless @meal.possible_restaurants.exists?( @possible_restaurant.id )

    respond_to do |format|
      format.html { redirect_to @meal }
      format.js
    end
  end

  def destroy
    possible_meal_restaurant = PossibleMealRestaurant.find_by( id: params[ :id ] )
    if possible_meal_restaurant.present?
      PossibleMealRestaurant.transaction do
        possible_meal_restaurant.destroy!

        if @possible_restaurant == @meal.restaurant
          @meal.restaurant = nil
          @meal.save!
          redirect_to @meal
          return
        end
      end
    end

    respond_to do |format|
      format.html { redirect_to @meal }
      format.js
    end
  end

  private

    def find_models
      @meal = Meal.find( params[ :meal_id ] )
      @possible_restaurant = Restaurant.from_place_id( params[ :place_id ] )
    end

    def correct_user
      unless @meal.organizer?( current_user )
        redirect_to @meal
      end
    end

end
