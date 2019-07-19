class AddColumnIdToTask < ActiveRecord::Migration[5.2]
  def change
    add_reference :tasks, :column, foreign_key: true
  end
end
