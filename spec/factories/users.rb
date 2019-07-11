FactoryBot.define do
  factory :user do
    name { Faker::Name.first_name }
    surname { Faker::Name.last_name }
    email { Faker::Internet.email }
    password { Faker::Crypto.md5 }
  end
end
