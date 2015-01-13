class CreateAppointments < ActiveRecord::Migration
  def change
    create_table :appointments do |t|
      t.datetime :start_time
      t.datetime :end_time
      t.string :kind
      t.string :description
      t.integer :position_id

      t.timestamps
    end
  end
end
