class ChangeTasksOrderToDefaultInColumns < ActiveRecord::Migration[5.2]
  def change
    change_column :columns, :tasks_order, :integer, array: true, default: [] 
  end
end
