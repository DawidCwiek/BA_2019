FactoryBot.define do
  factory :project do
    title { Faker::Name.first_name }
    desc { Faker::Name.last_name }
    key { Faker::Company.name[0..2] }
  end
end
