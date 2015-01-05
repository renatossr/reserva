require 'rails_helper'

describe 'Position Deletion' do
  
  it 'deletes positions' do
    @establishment = Fabricate(:establishment)
    @position = Fabricate(:position, establishment: @establishment)

    delete "/api/v1/establishments/#{@establishment.id}/positions/#{@position.id}"
    expect(response.status).to eq(204)

    get "/api/v1/establishments/#{@establishment.id}/positions/"
    @positions = json(response.body)
    expect(@positions.length).to be(0)

  end
end 
