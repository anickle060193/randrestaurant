class CreatePossibleMealRestaurants < ActiveRecord::Migration[5.0]
  def change
    create_table :possible_meal_restaurants do |t|
      t.belongs_to :meal, foreign_key: true, null: false
      t.belongs_to :restaurant, foreign_key: true, null: false

      t.timestamps
      t.index [ :meal_id, :restaurant_id ], unique: true
    end
  end
end
