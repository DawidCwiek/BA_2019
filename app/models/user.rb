# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :confirmable
  has_many :task, dependent: :nullify

  has_many :workers, dependent: :nullify
  has_many :project, through: :workers

  validates :full_name, presence: true

  def admin?
    admin || super_admin
  end
end
