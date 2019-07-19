# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :project
  belongs_to :column, optional: true
  belongs_to :user, optional: true

  validates :title, presence: true
  validates :desc, presence: true
  validates :project_id, presence: true
  # validates :column_id, presence: true
end
