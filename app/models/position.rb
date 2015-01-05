class Position < ActiveRecord::Base
  acts_as_paranoid #implements soft deletion

  validates :name, presence: true

  belongs_to :establishment
end
