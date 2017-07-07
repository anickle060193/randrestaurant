class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :find_user
  before_action :correct_user

  def show
    @liked_restaurants = @user.restaurants.page( params[ :liked_restaurants_page ] || 1 ).per( 8 )
    @organized_meals = @user.organized_meals.order( :time ).page( params[ :organized_meals_page ] || 1 ).per( 8 )
  end

  private

    def find_user
      @user = User.find( params[ :id ] )
    end

    def correct_user
      if @user != current_user
        redirect_to :root_path
      end
    end

end
