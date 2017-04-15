class UsersController < ApplicationController
  before_action :find_user

  def show
    @restaurants = @user.restaurants.page( params[ :restaurant_page ] || 1 ).per( 8 )
  end

  private

    def find_user
      @user = User.find( params[ :id ] )
    end

end
