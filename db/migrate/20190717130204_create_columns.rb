class CreateColumns < ActiveRecord::Migration[5.2]
  def change
    create_table :columns do |t|
      t.belongs_to :project, index: true
      t.integer :tasks_order, array: true

      t.timestamps
    end
    add_index :columns, :tasks_order, using: 'gin'
  end
end
