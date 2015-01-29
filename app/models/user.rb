# == Schema Information
#
# Table name: users
#
#  id               :integer          not null, primary key
#  email            :string(255)      not null
#  crypted_password :string(255)
#  salt             :string(255)
#  created_at       :datetime
#  updated_at       :datetime
#  role             :string(255)
#
# Indexes
#
#  index_users_on_email  (email) UNIQUE
#

require 'auth_token'

class User < ActiveRecord::Base
  authenticates_with_sorcery!

  validates :password, presence: true, if: :password_required?
  validates :password, confirmation: true, if: :password_required?
  validates :password, length: { minimum: 5 }, allow_blank: true
  
  has_one :profile

  def password_required?
    password.present? || password_confirmation.present?
  end

  def generate_auth_token
    payload = { 
      user_id: self.id
    }
    AuthToken.encode(payload)
  end
end
