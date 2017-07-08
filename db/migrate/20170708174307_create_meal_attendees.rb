class CreateMealAttendees < ActiveRecord::Migration[5.0]
  def change
    create_table :meal_attendees do |t|
      t.belongs_to :user, foreign_key: true, null: false
      t.belongs_to :meal, foreign_key: true, null: false

      t.timestamps
      t.index [ :user_id, :meal_id ], unique: true
    end
  end
end
