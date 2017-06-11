class CreateNeverAgains < ActiveRecord::Migration[5.0]
  def change
    create_table :never_agains do |t|
      t.belongs_to :user, foreign_key: true
      t.belongs_to :restaurant, foreign_key: true

      t.timestamps
      t.index [ :user_id, :restaurant_id ], unique: true
    end
  end
end
