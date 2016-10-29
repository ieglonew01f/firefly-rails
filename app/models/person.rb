class Person < ActiveRecord::Base
  validates :for_id, uniqueness: { scope: :by_id }
end
