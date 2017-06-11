class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable,
         :trackable,
         :validatable

  has_many :restaurant_likes
  has_many :restaurants, through: :restaurant_likes, dependent: :destroy

  has_many :never_agains
  has_many :never_agained_restaurants, through: :never_agains, source: :restaurant

  def like( restaurant )
    restaurants << restaurant
  end

  def unlike( restaurant )
    restaurants.destroy( restaurant )
  end

  def likes?( restaurant )
    restaurants.exists?( restaurant.id )
  end

  def never_again( restaurant )
    never_agained_restaurants << restaurant
  end

  def unnever_again( restaurant )
    never_agained_restaurants.destroy( restaurant )
  end

  def never_agained?( restaurant )
    never_agained_restaurants.exists?( restaurant.id )
  end
end
