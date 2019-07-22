# frozen_string_literal: true
json.data do
  json.array! @projects, partial: 'projects/projects', as: :projects
end
