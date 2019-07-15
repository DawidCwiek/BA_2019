# frozen_string_literal: true

class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  has_many :task
  has_and_belongs_to_many :projects

  validates :name, presence: true
  validates :surname, presence: true

  def fullname
    "#{name} #{surname}"
  end
end
