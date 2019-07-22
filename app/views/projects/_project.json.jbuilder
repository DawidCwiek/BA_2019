# frozen_string_literal: true

json.extract! projects, :id, :title, :desc, :key, :users, :created_at, :updated_at
json.url projects_url(projects, format: :json)
