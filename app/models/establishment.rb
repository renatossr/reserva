# == Schema Information
#
# Table name: establishments
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  created_at :datetime
#  updated_at :datetime
#  deleted_at :datetime
#  address1   :string(255)
#  address2   :string(255)
#  city       :string(255)
#  state      :string(255)
#  country    :string(255)
#  zip        :string(255)
#  lat        :float
#  long       :float
#  review     :integer
#
# Indexes
#
#  index_establishments_on_deleted_at  (deleted_at)
#

class Establishment < ActiveRecord::Base
  acts_as_paranoid #implements soft deletion
  
  validates :name, presence: true

  has_many :positions

  # --------------------------- Scopes --------------------------------

end
