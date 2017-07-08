class Meal < ApplicationRecord
  belongs_to :organizer, class_name: 'User', foreign_key: 'user_id'
  belongs_to :restaurant

  has_many :possible_meal_restaurants
  has_many :possible_restaurants, through: :possible_meal_restaurants, source: :restaurant, dependent: :destroy

  validates :name, presence: true
  validates :time, presence: true
  validates :organizer, presence: true
end
