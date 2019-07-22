# frozen_string_literal: true

FactoryBot.define do
  factory :user do
    full_name { Faker::Name.first_name }
    email { Faker::Internet.email }
    password { Faker::Crypto.md5 }
    password_confirmation { password }
    confirmed_at { Date.today }
  end
end
