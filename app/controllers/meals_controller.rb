class MealsController < ApplicationController
  before_action :authenticate_user!
  before_action :find_meal, only: [ :show, :edit, :update ]
  before_action :correct_user, only: [ :edit, :update ]

  def show
  end

  def new
    @meal = Meal.new
  end

  def create
    @meal = Meal.new( meal_params )
    @meal.organizer = current_user
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

  private

    def meal_params
      params.require( :meal ).permit( :name, :time )
    end

    def find_meal
      @meal = Meal.find( params[ :id ] )
    end

    def correct_user
      redirect_to @meal unless @meal.organizer == current_user
    end

end
