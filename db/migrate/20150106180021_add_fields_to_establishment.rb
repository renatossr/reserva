class AddFieldsToEstablishment < ActiveRecord::Migration
  def change
    add_column :establishments, :address1, :string
    add_column :establishments, :address2, :string
    add_column :establishments, :city, :string
    add_column :establishments, :state, :string
    add_column :establishments, :country, :string
    add_column :establishments, :zip, :string
    add_column :establishments, :lat, :float
    add_column :establishments, :long, :float
    add_column :establishments, :review, :integer
  end
end
