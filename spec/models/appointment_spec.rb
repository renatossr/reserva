# == Schema Information
#
# Table name: appointments
#
#  id          :integer          not null, primary key
#  start_time  :datetime
#  end_time    :datetime
#  kind        :string(255)
#  description :string(255)
#  position_id :integer
#  created_at  :datetime
#  updated_at  :datetime
#  deleted_at  :datetime
#

require 'rails_helper'

RSpec.describe Appointment, :type => :model do
  pending "add some examples to (or delete) #{__FILE__}"
end
