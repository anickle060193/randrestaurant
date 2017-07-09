class PossibleMealRestaurant < ApplicationRecord
  belongs_to :meal
  belongs_to :restaurant

  has_many :votes, class_name: 'PossibleMealRestaurantVote', foreign_key: 'possible_meal_restaurant_id', dependent: :destroy

  validates :meal, presence: true
  validates :restaurant, presence: true
  validates :restaurant, uniqueness: { scope: :meal, message: 'is already a possible restaurant of that meal.' }

  def cast_vote( user, v )
    if meal.attended_by?( user )
      if voted?( user )
        vote = votes.find_by!( user: user ).update!( vote: v )
      else
        vote = votes.create!( user: user, vote: v )
      end
    end
  end

  def retract_vote( user )
    votes.where( user: user ).destroy_all if voted?( user )
  end

  def voted?( user )
    votes.where( user: user ).any?
  end

end
