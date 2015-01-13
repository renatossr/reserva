require 'rails_helper'

describe "Establishment Viewing" do

  it 'sends a list of establishments' do
    Fabricate.times(10, :establishment)

    get '/api/v1/establishments'

    expect(response).to be_success
    json = json(response.body)
    expect(json.length).to eq(10)

  end

  it 'retrieves a specific establishment' do
    @establishment = Fabricate(:establishment)

    get "/api/v1/establishments/#{@establishment.id}"

    expect(response).to be_success
    json = json(response.body)
    expect(json[:id]).to eq(@establishment.id)
    expect(json[:name]).to eq(@establishment.name)

  end
end
