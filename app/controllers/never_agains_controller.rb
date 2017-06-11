class NeverAgainsController < ApplicationController
  before_action :authenticate_user!

  def create
    restaurant = Restaurant.find( params[ :restaurant_id ] )

    NeverAgain.transaction do
      current_user.never_again( restaurant ) unless current_user.never_agained?( restaurant )
      current_user.unlike( restaurant ) if current_user.likes?( restaurant )
    end

    redirect_to restaurant
  end

  def destroy
    never_again = NeverAgain.find_by( id: params[ :id ] )
    if never_again.present?
      never_again.user.unnever_again( never_again.restaurant ) if never_again.user == current_user
      redirect_to never_again.restaurant
    else
      redirect_to Restaurant.find( params[ :restaurant_id ] )
    end
  end

end
