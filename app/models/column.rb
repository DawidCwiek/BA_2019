class Column < ApplicationRecord
  after_create :add_to_columns_order
  after_destroy :remove_in_column_order
  belongs_to :project
  has_many :tasks, dependent: :nullify

  validates :name, presence: true

  private

  def add_to_columns_order
    project.add_new_column!(id)
  end

  def remove_in_column_order
    project.remove_column!(id)
  end
end
