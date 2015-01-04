require 'rails_helper'

describe 'Establishment Creation' do
  
  it 'creates a new establishment with valid data' do
    e = { 
      establishment:{
        name: 'Renato'
      }
    }
    post '/api/v1/establishments', e.to_json, { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }

    expect(response.status).to eq(201)
    expect(response.content_type).to eq(Mime::JSON)
    
    establishment = json(response.body)
    expect(api_v1_establishment_url(establishment.id)).to eq(response.location)
    expect(establishment.name).to eq(e[:establishment][:name])
  
  end

  it 'does not create an establishment with invalid data' do
    e = { 
      establishment:{
        name: nil
      }
    }
    post '/api/v1/establishments', e.to_json, { 'Accept' => 'application/json', 'Content-Type' => 'application/json' }
    
    expect(response.status).to eq(422)
    expect(response.content_type).to eq(Mime::JSON)
    
    establishment = json(response.body)
    expect(establishment.errors.length).to be > 0

  end
end
