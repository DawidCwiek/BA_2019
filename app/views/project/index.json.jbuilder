# frozen_string_literal: true

json.data do
  json.array! @projects, partial: 'project/project', as: :project
end
