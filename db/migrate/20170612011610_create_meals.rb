class CreateMeals < ActiveRecord::Migration[5.0]
  def change
    create_table :meals do |t|
      t.string :name, null: false
      t.datetime :time, null: false
      t.belongs_to :user, foreign_key: true, null: false
      t.belongs_to :restaurant, foreign_key: true

      t.timestamps
    end
  end
end
