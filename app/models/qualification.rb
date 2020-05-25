class Qualification < ApplicationRecord
  validates :name, presence: true
  validates :experience, presence: true
  validates :skill, presence: true 
end
