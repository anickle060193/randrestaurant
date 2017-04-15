class CreateRestaurantLikes < ActiveRecord::Migration[5.0]
  def change
    create_table :restaurant_likes do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.belongs_to :restaurant, foreign_key: true, null: false

      t.timestamps
    end

    add_index :restaurant_likes, [ :user_id, :restaurant_id ], unique: true
  end
end
