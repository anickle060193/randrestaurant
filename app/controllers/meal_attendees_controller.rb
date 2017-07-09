class MealAttendeesController < ApplicationController
  before_action :authenticate_user!

  def create
    @meal = Meal.find( params[ :meal_id ] )
    @new_attendee = User.find( params[ :user_id ] )
    @meal.invite( @new_attendee )

    respond_to do |format|
      format.html { redirect_to @meal }
      format.js
    end
  end

  def destroy
    meal_attendee = MealAttendee.find_by( id: params[ :id ] )
    if meal_attendee.present?
      meal_attendee.destroy()
      @meal = meal_attendee.meal
    else
      @meal = Meal.find( params[ :meal_id ] )
    end

    respond_to do |format|
      format.html { redirect_to @meal }
      format.js
    end
  end
end
