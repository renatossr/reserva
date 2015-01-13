require 'spec_helper'

describe 'Position viewing' do
  
  it 'sends the list of all the positions' do
    establishment = Fabricate(:establishment)
    Fabricate.times(10, :position, establishment: establishment)

    establishment = Fabricate(:establishment)
    Fabricate.times(10, :position, establishment: establishment)
    
    get '/api/v1/positions'

    expect(response.status).to eq(200)
    positions = json(response.body)
    expect(positions.length).to eq(20) 
  end

  it 'sends the list of the positions in a specific establishment' do
    establishment = Fabricate(:establishment)
    Fabricate.times(10, :position, establishment: establishment)  

    establishment = Fabricate(:establishment)
    Fabricate.times(10, :position, establishment: establishment)

    get "/api/v1/establishments/#{establishment.id}/positions"

    expect(response.status).to eq(200)
    positions = json(response.body)
    expect(positions.length).to eq(10) 
  end

  it 'retrieves the details of a position' do
    establishment = Fabricate(:establishment)
    position = Fabricate(:position, establishment: establishment)

    get "/api/v1/positions/#{position.id}"

    expect(response.status).to eq(200)
    positionResponse = json(response.body)
    expect(positionResponse[:id]).to eq(position.id)
    expect(positionResponse[:name]).to eq(position.name)

  end
end
