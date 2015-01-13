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

Fabricator(:appointment) do
  position
  start_time DateTime.parse("10 Jan 10:00")
  end_time DateTime.parse("10 Jan 10:30")
  kind 'Appointment'
end
