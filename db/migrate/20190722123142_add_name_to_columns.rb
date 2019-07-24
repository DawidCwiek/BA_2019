class AddNameToColumns < ActiveRecord::Migration[5.2]
  def change
    add_column :columns, :name, :string
  end
end
