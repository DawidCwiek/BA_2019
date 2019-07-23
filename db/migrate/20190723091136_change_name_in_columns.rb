class ChangeNameInColumns < ActiveRecord::Migration[5.2]
  def change
    change_column :columns, :name, :string, default: 'New Column'
  end
end
