FactoryBot.define do
  factory :task do
    project
    title { Faker::Games::Pokemon.name }
    desc { Faker::Name.last_name }
  end
end
