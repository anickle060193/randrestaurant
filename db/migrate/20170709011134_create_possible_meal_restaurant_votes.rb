class CreatePossibleMealRestaurantVotes < ActiveRecord::Migration[5.0]
  def change
    create_table :possible_meal_restaurant_votes do |t|
      t.boolean :vote, null: false
      t.belongs_to :user, foreign_key: true, null: false
      t.belongs_to :possible_meal_restaurant, foreign_key: true, null: false, index: { name: 'possible_meal_restaurant_index' }

      t.timestamps
      t.index [ :user_id, :possible_meal_restaurant_id ], name: 'unique_vote_index', unique: true
    end
  end
end
