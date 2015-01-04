class Establishment < ActiveRecord::Base
  acts_as_paranoid #implements soft deletion
  
  validates :name, presence: true

  has_many :positions

  # --------------------------- Scopes --------------------------------

end
