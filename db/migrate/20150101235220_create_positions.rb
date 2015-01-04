class CreatePositions < ActiveRecord::Migration
  def change
    create_table :positions do |t|
      t.string :name
      t.integer :establishment_id

      t.timestamps
    end
  end
end
