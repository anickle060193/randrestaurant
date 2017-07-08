class MealAttendee < ApplicationRecord
  belongs_to :user
  belongs_to :meal

  validates :user, presence: true
  validates :meal, presence: true
  validates :user, uniqueness: { scope: :meal_id, message: 'is already attending meal.' }
end
