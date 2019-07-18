# frozen_string_literal: true

class Project < ApplicationRecord
  has_many :task
  has_many :columns
  has_and_belongs_to_many :users

  validates :title, presence: true
  validates :desc, presence: true, length: { maximum: 160 }
  validates :key, presence: true, uniqueness: true, length: { maximum: 3 }

  def add_columns_to_columns_order(value)
    self.columns_order.push(value)
    self.save
  end

  def move_column!(column_id, new_position)
    old_position = self.columns_order.find_index(column_id)
    delete_position_offset = new_position > old_position ? 0 : 1
    self.columns_order.insert(new_position, column_id).delete_at(old_position + delete_position_offset)
    save
  end
end
