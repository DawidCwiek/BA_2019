class Task < ApplicationRecord
  belongs_to :project
  belongs_to :user

  validates :title, presence: true
  validates :desc, presence: true
  validates :isEpik, presence: true
  validates :user_id, presence: true
  validates :project_id, presence: true

end
