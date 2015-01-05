require 'rails_helper'

describe 'Establishment Deletion' do
  
  it 'deletes establishments' do
    @establishment = Fabricate(:establishment)

    delete "/api/v1/establishments/#{@establishment.id}"
    expect(response.status).to eq(204)

    get "/api/v1/establishments"
    @establishments = json(response.body)
    expect(@establishments.length).to be(0)

  end
end 
