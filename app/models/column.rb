class Column < ApplicationRecord
  after_create :add_to_columns_order
  belongs_to :project
  has_many :task

  def add_to_columns_order
    project = Project.find(self.project_id)
    project.add_columns_to_columns_order(self.id)
  end
end
