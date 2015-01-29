require 'rails_helper'

describe "Appointment Viewing" do
  before(:each) do
    @establishemnt = Fabricate(:establishment)
    @position = Fabricate(:position, establishment: @establishment)
  end

  it 'sends a list of appointments' do 
    Fabricate(:appointment, position: @position, start_time: DateTime.parse("12 Jan at 10:00"), end_time: DateTime.parse("12 Jan at 10:30"))
    Fabricate(:appointment, position: @position, start_time: DateTime.parse("11 Jan at 10:00"), end_time: DateTime.parse("11 Jan at 10:30"))

    get '/api/v1/appointments'

    expect(response.status).to eq(204)

  end

  it 'retrieves a specific appointment' do
    @appointment = Fabricate(:appointment, position: @position)

    get "/api/v1/appointments/#{@appointment.id}"

    expect(response).to be_success
    json = json(response.body)
    expect(json[:id]).to eq(@appointment.id)

  end
  
  it 'retrieves all appointments from a position' do
    @appointment = Fabricate(:appointment, position: @position)
    @appointment = Fabricate(:appointment, position: @position, start_time: DateTime.parse("12 Jan at 10:00"), end_time: DateTime.parse("12 Jan at 10:30"))

    get "/api/v1/positions/#{@position.id}/appointments"

    expect(response).to be_success
    json = json(response.body)
    expect(json.length).to eq(2)

  end
end
