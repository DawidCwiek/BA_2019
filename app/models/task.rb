# frozen_string_literal: true

class Task < ApplicationRecord
  after_create :add_to_tasks_order
  belongs_to :project
  belongs_to :column, optional: true
  belongs_to :user, optional: true

  validates :title, presence: true
  validates :desc, presence: true
  validates :project_id, presence: true
  # validates :column_id, presence: true

  def add_to_tasks_order
    first_column = project.columns_order.first
    column = Column.find(first_column)
    column.add_new_task!(id)
  end
end
