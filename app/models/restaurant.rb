class Restaurant < ApplicationRecord
  has_many :restaurant_likes
  has_many :users, through: :restaurant_likes, dependent: :destroy

  has_many :never_agains
  has_many :never_againers, through: :never_agains, source: :user

  validates :name, presence: true
  validates :link, url: true
end
