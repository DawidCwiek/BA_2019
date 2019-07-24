# frozen_string_literal: true

json.extract! project, :id, :title, :desc, :key, :users, :columns_order, :created_at, :updated_at
json.url projects_url(project, format: :json)
