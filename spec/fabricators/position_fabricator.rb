# == Schema Information
#
# Table name: positions
#
#  id               :integer          not null, primary key
#  name             :string(255)
#  establishment_id :integer
#  created_at       :datetime
#  updated_at       :datetime
#  deleted_at       :datetime
#
# Indexes
#
#  index_positions_on_deleted_at  (deleted_at)
#

Fabricator(:position) do
  establishment
  name { Faker::Name.name }
end
