class ChangeRestaurantsToUseGooglePlaces < ActiveRecord::Migration[5.0]
  def change
    reversible do |change|
      execute 'DELETE FROM restaurants'
    end

    remove_index :restaurants, :name

    remove_column :restaurants, :name, :string
    remove_column :restaurants, :link, :string

    add_column :restaurants, :place_id, :string, null: false
    add_index :restaurants, :place_id, unique: true
  end
end
