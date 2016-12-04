class OnlineUser < ActiveRecord::Base
  validates  :id, uniqueness: { scope: :user_id }
  belongs_to :user
  has_one    :user
end
