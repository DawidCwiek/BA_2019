# frozen_string_literal: true

class Project < ApplicationRecord
  has_many :task, dependent: :destroy
  has_many :columns, dependent: :destroy
  has_many :workers, dependent: :destroy
  has_many :users, through: :workers
  validates :title, presence: true
  validates :desc, presence: true, length: { maximum: 160 }
  validates :key, presence: true, uniqueness: true, length: { maximum: 3 }
  def add_new_column!(column_id)
    columns_order.push(column_id)
    save
  end

  def remove_column!(column_id)
    position = columns_order.find_index(column_id)
    columns_order.delete_at(position)
    save
  end

  def move_column!(column_id, new_position)
    old_position = columns_order.find_index(column_id)
    delete_position_offset = new_position > old_position ? 0 : 1
    columns_order.insert(new_position, column_id).delete_at(old_position + delete_position_offset)
    save
  end
end
