class PossibleMealRestaurant < ApplicationRecord
  belongs_to :meal
  belongs_to :restaurant

  validates :meal_id, presence: true
  validates :restaurant_id, presence: true
  validates :meal_id, uniqueness: { scope: :restaurant_id, message: 'is already possible restaurant of meal.' }
end
