FactoryBot.define do
  factory :column do
    name { Faker::Movies::HarryPotter.character }
    project
  end
end
