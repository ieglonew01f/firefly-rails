class Follower < ActiveRecord::Base
  validates :following_id, uniqueness: { scope: :follower_id }
end
