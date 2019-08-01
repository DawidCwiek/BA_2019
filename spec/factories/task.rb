FactoryBot.define do
  factory :task do
    column
    title { Faker::Games::Pokemon.name }
    desc { Faker::Name.last_name }
    project_id {column.project_id}
  end
end
