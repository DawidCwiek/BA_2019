class AddArchivedToWorkers < ActiveRecord::Migration[5.2]
  def change
    add_column :workers, :archived, :boolean, default: false
  end
end
