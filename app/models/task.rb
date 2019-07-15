# frozen_string_literal: true

class Task < ApplicationRecord
  belongs_to :project
  belongs_to :user, optional: true

  validates :title, presence: true
  validates :desc, presence: true
  validates :project_id, presence: true
end
