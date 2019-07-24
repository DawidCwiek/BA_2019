class AddNameToColumn < ActiveRecord::Migration[5.2]
  def change
    add_column :columns, :name, :string, default: 'New Column'
  end
end
