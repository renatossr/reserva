class Position < ActiveRecord::Base
  acts_as_paranoid #implements soft deletion

  belongs_to :establishment
end
