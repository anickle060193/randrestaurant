class AddNameIndexToRestaurants < ActiveRecord::Migration[5.0]
  def change
    add_index :restaurants, :name
  end
end
