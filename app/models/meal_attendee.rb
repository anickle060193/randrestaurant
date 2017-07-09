class MealAttendee < ApplicationRecord
  belongs_to :user
  belongs_to :meal

  before_destroy :remove_attendee_votes

  validates :user, presence: true
  validates :meal, presence: true
  validates :user, uniqueness: { scope: :meal_id, message: 'is already attending meal.' }

  private

    def remove_attendee_votes
      meal.possible_restaurant_votes.where( user: user ).destroy_all
    end
end
