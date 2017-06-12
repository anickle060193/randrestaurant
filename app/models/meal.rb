class Meal < ApplicationRecord
  belongs_to :organizer, class_name: 'User', foreign_key: 'user_id'
  belongs_to :location, class_name: 'Restaurant', foreign_key: 'restaurant_id'

  validates :name, presence: true
  validates :time, presence: true
  validates :user_id, presence: true
end
