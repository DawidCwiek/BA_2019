# frozen_string_literal: true

class CreateProjects < ActiveRecord::Migration[5.2]
  def change
    create_table :projects do |t|
      t.string :title
      t.text :desc, length: 160
      t.string :key, length: 3, unique: true
      t.belongs_to :user, index: true

      t.timestamps
    end
  end
end
