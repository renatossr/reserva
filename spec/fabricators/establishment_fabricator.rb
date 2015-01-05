Fabricator(:establishment) do
  name { Faker::Company.bs.titleize }
end
