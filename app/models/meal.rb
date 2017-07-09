class Meal < ApplicationRecord
  belongs_to :organizer, class_name: 'User', foreign_key: 'user_id'
  belongs_to :restaurant

  has_many :possible_meal_restaurants
  has_many :possible_restaurants, through: :possible_meal_restaurants, source: :restaurant, dependent: :destroy

  has_many :possible_restaurant_votes, through: :possible_meal_restaurants, source: :votes

  has_many :meal_attendees
  has_many :attendees, through: :meal_attendees, source: :user, dependent: :destroy

  validates :name, presence: true
  validates :time, presence: true
  validates :organizer, presence: true

  def attended_by?( user )
    attendees.exists?( user.id )
  end

  def invite( user )
    attendees << user unless attended_by?( user )
  end

  def uninvite( user )
    attendees.destroy( user ) if attended_by?( user )
  end

  def voted?( user, possible_restaurant )
    possible_meal_restaurants.find_by!( restaurant: possible_restaurant ).voted?( user )
  end

  def cast_vote( user, possible_restaurant, vote )
    possible_meal_restaurants.find_by!( restaurant: possible_restaurant ).cast_vote( user, vote )
  end

  def retract_vote( user, possible_restaurant )
    possible_meal_restaurants.find_by!( restaurant: possible_restaurant ).retract_vote( user )
  end

end
