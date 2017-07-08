class PossibleMealRestaurant < ApplicationRecord
  belongs_to :meal
  belongs_to :restaurant

  validates :meal, presence: true
  validates :restaurant, presence: true
  validates :restaurant, uniqueness: { scope: :meal, message: 'is already a possible restaurant of that meal.' }
end
