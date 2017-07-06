class Restaurant < ApplicationRecord
  require 'google_maps'

  has_many :restaurant_likes
  has_many :users, through: :restaurant_likes, dependent: :destroy

  has_many :never_agains
  has_many :never_againers, through: :never_agains, source: :user, dependent: :destroy

  has_many :meals, dependent: :nullify

  has_many :possible_meal_restaurants
  has_many :possible_meals, through: :possible_meal_restaurants, source: :meal, dependent: :destroy

  validates :place_id, presence: true, uniqueness: true

  def self.from_place_id( place_id )
    Restaurant.find_or_initialize_by( place_id: place_id );
  end

  def to_param
    self.place_id
  end

  def name
    lazy_load

    @place[ 'name' ] if @place.present?
  end

  def link
    lazy_load

    @place[ 'website' ] if @place.present?
  end

  def location
    lazy_load

    @place[ 'geometry' ][ 'location' ] if @place.present?
  end

  private

    def lazy_load
      if @place.blank? && place_id.present?
        @place = GoogleMaps.new().place_details( self.place_id )
      end
    end

end
