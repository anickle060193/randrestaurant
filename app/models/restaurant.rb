class Restaurant < ApplicationRecord
  validates :name, presence: true
  validates :link, url: true

  default_scope { order( "LOWER( name )" ) }
end
