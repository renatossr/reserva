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

class Position < ActiveRecord::Base
  acts_as_paranoid #implements soft deletion

  validates :name, presence: true

  belongs_to :establishment
  has_many :appointments
end
