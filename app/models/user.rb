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

  default_scope { order( :email ) }

  def like( restaurant )
    restaurants << restaurant
  end

  def unlike( restaurant )
    restaurants.destroy( restaurant )
  end

  def likes?( restaurant )
    restaurants.exists?( restaurant.id )
  end
end
