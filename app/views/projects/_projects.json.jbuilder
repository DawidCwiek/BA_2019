# frozen_string_literal: true

json.extract! project, :id, :title, :desc, :key, :users, :created_at, :updated_at, :archived
json.url project_url(project, format: :json)
