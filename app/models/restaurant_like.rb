class RestaurantLike < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :user_id, presence: true, uniqueness: { scope: :restaurant_id, message: "already likes this restaurant." }
  validates :restaurant_id, presence: true
end
