class Meal < ApplicationRecord
  belongs_to :organizer, class_name: 'User', foreign_key: 'user_id'
  belongs_to :restaurant

  has_many :possible_meal_restaurants
  has_many :possible_restaurants, through: :possible_meal_restaurants, source: :restaurant, dependent: :destroy

  has_many :meal_attendees
  has_many :attendees, through: :meal_attendees, source: :user, dependent: :destroy

  validates :name, presence: true
  validates :time, presence: true
  validates :organizer, presence: true
end
