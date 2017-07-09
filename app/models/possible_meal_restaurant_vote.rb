class PossibleMealRestaurantVote < ApplicationRecord
  belongs_to :user
  belongs_to :possible_meal_restaurant

  validates :vote, inclusion: { in: [ true, false ] }
  validates :user, presence: true
  validates :possible_meal_restaurant, presence: true
  validates :user, uniqueness: { scope: :possible_meal_restaurant, message: 'has already voted for possible meal restaurant.' }
end
