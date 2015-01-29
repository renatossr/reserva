# == Schema Information
#
# Table name: profiles
#
#  id         :integer          not null, primary key
#  name       :string(255)
#  email      :string(255)
#  created_at :datetime
#  updated_at :datetime
#  deleted_at :datetime
#  user_id    :integer
#

class Profile < ActiveRecord::Base
  acts_as_paranoid #implements sof deletion

  validates :name, presence: true
  validates :email, presence: true

  belongs_to :user
  has_many :establishments
end
