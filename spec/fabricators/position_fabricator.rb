Fabricator(:position) do
  establishment
  name { Faker::Name.name }
end
