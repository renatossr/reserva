require 'rails_helper'

describe 'Position Creation' do
  before(:all) do
    @establishment = Fabricate(:establishment)
  end

  it 'creates a new position with valid data' do
    p = { 
      position:{
        name: 'Renato',
        establishment: @establishment
      }
    }
    post '/api/v1/positions', p.to_json, { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }

    expect(response.status).to eq(201)
    expect(response.content_type).to eq(Mime::JSON)
    
    position = json(response.body)
    expect(api_v1_position_url(position.id)).to eq(response.location)
    expect(position.name).to eq(p[:position][:name])
  
  end

  it 'does not create a new position with invalid data' do
    p = { 
      position:{
        name: nil,
        establishment: @establishment
      }
    }
    post '/api/v1/positions', p.to_json, { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    
    expect(response.status).to eq(422)
    expect(response.content_type).to eq(Mime::JSON)
    
    position = json(response.body)
    expect(position.errors.length).to be > 0

  end
end
