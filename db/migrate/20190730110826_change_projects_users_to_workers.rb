class ChangeProjectsUsersToWorkers < ActiveRecord::Migration[5.2]
  def change
    rename_table :projects_users, :workers
  end
end
