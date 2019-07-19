class AddColumnsOrdertoProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :columns_order, :integer, array: true, default: []
    add_index :projects, :columns_order, using: 'gin'
  end
end
