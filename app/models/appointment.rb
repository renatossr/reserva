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

class Appointment < ActiveRecord::Base 
  acts_as_paranoid #implements soft deletion

  belongs_to :position

  # Validations ---------------------------------
  validates :start_time, presence: true
  validates :end_time, presence: true
  validates :position, presence: true
  validates_inclusion_of :kind, :in => proc { Appointment.kinds_of_appointment }
  validate :cannot_have_conflicts, :if => :is_appointment?

  # Callbacks -----------------------------------
  before_save :cancel_appointment_in_my_range, :if => :is_unavailable_and_has_conflicts?

  # Scopes --------------------------------------
  scope :only_of_day,             ->(day) { where('start_time BETWEEN ? AND ?', day.beginning_of_day, day.end_of_day) }
  scope :only_of_period,          ->(start_day, end_day) { where('start_time BETWEEN ? AND ?', start_day.beginning_of_day, end_day.end_of_day) }
  scope :of_positions,            ->(positions) { where('position_id IN (?)', positions) }
  scope :only_of_kind,            ->(kind) { where('kind = ?', kind) }
  scope :conflicts_with,          ->(appointment) { Appointment.where('(start_time > ? AND start_time < ?) OR (end_time > ? AND end_time < ?)', appointment.start_time, appointment.end_time, appointment.start_time, appointment.end_time) }

  # Methods -------------------------------------
  # Validation method for conflicts
  def cannot_have_conflicts
    errors.add(:base, "Conflicts with another appointment") if self.has_conflicts?
  end
  
  # Check flag for NotAvailable
  def is_unavailable?
    self.kind == "NotAvailable"
  end

  # Check flag for Appointment
  def is_appointment?
    self.kind == "Appointment"
  end

  # Checks for conflicts
  def has_conflicts?
    self.conflicts.any?
  end

  # Check for unavailability and conflicts
  def is_unavailable_and_has_conflicts?
    self.is_unavailable? && self.has_conflicts?
  end

  # Check for unavailability and conflicts
  def is_appointment_and_has_conflicts?
    self.is_appointment? && self.has_conflicts?
  end

  # Retrieve conflicting appointments
  def conflicts
    Appointment.conflicts_with(self).only_of_kind('Appointment')
  end

  # Cycle through appointmetns with conflict and cancels them
  def delete_appointments_in_my_range
    self.conflicts.each { |o| o.delete }  
  end

  # Retrieves the ragnge of seconds in a appointment
  def period_in_seconds
    (start_time.to_i..end_time.to_i)
  end

  # Determines de duration in seconds
  def duration
    self.end_time - self.start_time
  end

  class << self

    # Returns the available kinds of appointment
    def kinds_of_appointment
      ["Appointment","NotAvailable"]
    end

    # Groups the appointments by interval - One appointment fills all the intervals between start and end time.
    def grouped_by_interval( range )
      grouped = Hash.new {|h,k| h[k] = [] }
      all.each { |r| r.period_in_seconds.step( range ) { |i| grouped[i/(range)] << r } }
      grouped
    end

    # Groups the appointments by kind
    def grouped_by_kind
      grouped = Hash.new {|h,k| h[k] = [] }
      all.each { |r| grouped[r.kind] << r }
      grouped
    end

    def me
      all.each { |r| print r.kind }
    end

    # Returns the default ordering
    def with_default_ordering
      order(:start_time)
    end

  end
end
