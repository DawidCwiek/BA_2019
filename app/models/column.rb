class Column < ApplicationRecord
  after_create :add_to_columns_order
  belongs_to :project
  has_many :task, dependent: :nullify

  def add_to_columns_order
    project.add_new_column!(id)
  end
end
