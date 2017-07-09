class PossibleMealRestaurantVotesController < ApplicationController
  before_action :authenticate_user!

  def create
    possible_meal_restaurant = PossibleMealRestaurant.find( params[ :possible_meal_restaurant_id ] )
    possible_meal_restaurant.cast_vote( current_user, params[ :vote ] )
    redirect_to possible_meal_restaurant.meal
  end

  def destroy
    possible_meal_restaurant_vote = PossibleMealRestaurantVote.find( params[ :id ] )
    possible_meal_restaurant_vote.destroy!
    redirect_to possible_meal_restaurant_vote.possible_meal_restaurant.meal
  end

end
