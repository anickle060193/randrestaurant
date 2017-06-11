class NeverAgain < ApplicationRecord
  belongs_to :user
  belongs_to :restaurant

  validates :user_id, presence: true
  validates :restaurant, presence: true
end
