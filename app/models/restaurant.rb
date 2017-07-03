class Restaurant < ApplicationRecord
  require 'google_maps'

  has_many :restaurant_likes
  has_many :users, through: :restaurant_likes, dependent: :destroy

  has_many :never_agains
  has_many :never_againers, through: :never_agains, source: :user, dependent: :destroy

  has_many :meals, dependent: :nullify

  validates :place_id, presence: true, uniqueness: true

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
