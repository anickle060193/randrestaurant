class MealsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_meal, only: [ :show, :edit, :update, :destroy ]
  before_action :correct_user, only: [ :edit, :update, :destroy ]

  def show
    if params[ :attendee_search ].present?
      @attendees_search = User.where.not( id: @meal.attendees ).where( 'email LIKE :search', search: "%#{params[ :attendee_search ]}%" )
    else
      @attendees_search = [ ]
    end

    respond_to :html, :js
  end

  def new
    @meal = Meal.new
    @meal.time = DateTime.now
  end

  def create
    @meal = Meal.new( meal_params )
    @meal.organizer = current_user
    @meal.invite( current_user )
    if @meal.save
      redirect_to @meal
    else
      render :new
    end
  end

  def edit
  end

  def update
    @meal.update( meal_params )
    if @meal.save
      redirect_to @meal
    else
      render :edit
    end
  end

  def destroy
    if @meal.destroy
      flash[ :alert ] = 'Meal deleted'
      redirect_to :root
    else
      redirect_to @meal
    end
  end

  private

    def meal_params
      params.require( :meal ).permit( :name, :time, :restaurant_id )
    end

    def find_meal
      @meal = Meal.find( params[ :id ] )
    end

    def correct_user
      redirect_to @meal unless @meal.organizer?( current_user )
    end

end
