# frozen_string_literal: true

json.array! @projects, partial: 'project/project', as: :project
