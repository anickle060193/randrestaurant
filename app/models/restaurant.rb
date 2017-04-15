class Restaurant < ApplicationRecord
  has_many :restaurant_likes
  has_many :users, through: :restaurant_likes, dependent: :destroy

  validates :name, presence: true
  validates :link, url: true

  default_scope { order( :name ) }
end
