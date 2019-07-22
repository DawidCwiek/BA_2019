FactoryBot.define do
  factory :project do
    title { Faker::Game.title }
    desc { Faker::Game.genre }
    key { Faker::Company.name[0..2] }
  end
end
