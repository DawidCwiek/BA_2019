class AddArchivedToProjects < ActiveRecord::Migration[5.2]
  def change
    add_column :projects, :archived, :boolean, default: false
  end
end
