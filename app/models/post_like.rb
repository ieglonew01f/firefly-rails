class PostLike < ActiveRecord::Base
  validates  :post_id, uniqueness: { scope: :user_id }
  belongs_to :post
  has_one    :post
  has_one    :user
end
