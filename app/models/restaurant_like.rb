class RestaurantLike < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :user, presence: true
  validates :restaurant, presence: true
  validates :user, uniqueness: { scope: :restaurant, message: 'already likes that restaurant.' }
end
