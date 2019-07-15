# frozen_string_literal: true

class CreateJoinTabletUserProject < ActiveRecord::Migration[5.2]
  def change
    create_table :projects_users do |t|
      t.belongs_to :user, index: true
      t.belongs_to :project, index: true
    end
  end
end
