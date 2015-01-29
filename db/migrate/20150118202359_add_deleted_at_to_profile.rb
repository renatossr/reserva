class AddDeletedAtToProfile < ActiveRecord::Migration
  def change
    add_column :profiles, :deleted_at, :datetime
  end
end
