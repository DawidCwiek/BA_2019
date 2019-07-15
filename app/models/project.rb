class Project < ApplicationRecord
  has_many :task
  has_and_belongs_to_many :users

  validates :title, presence: true
  validates :desc, presence: true, length: { maximum: 160 }
  validates :key, presence: true, uniqueness: true, length: { maximum: 3 }
end
