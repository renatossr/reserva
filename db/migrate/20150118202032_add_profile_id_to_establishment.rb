class AddProfileIdToEstablishment < ActiveRecord::Migration
  def change
    add_column :establishments, :profile_id, :integer
  end
end
