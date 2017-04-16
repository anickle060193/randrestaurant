class RestaurantsController < ApplicationController
  before_action :authenticate_user!, except: [ :index, :show ]
  before_action :find_restaurant, only: [ :show ]

  def index
    if params[ :search ].present?
      @restaurants = Restaurant.where( "name ILIKE :search", search: "%#{params[ :search ]}%" )
    else
      @restaurants = Restaurant.all
    end
    @restaurants = @restaurants.page( params[ :page ] || 1 ).per( 12 )
  end

  def show
  end

  def new
    @restaurant = Restaurant.new
  end

  def create
    @restaurant = Restaurant.new( restaurant_params )
    if @restaurant.save
      redirect_to @restaurant
    else
      render :new
    end
  end

  private

    def restaurant_params
      params.require( :restaurant ).permit( :name, :link )
    end

    def find_restaurant
      @restaurant = Restaurant.find( params[ :id ] )
    end

end
