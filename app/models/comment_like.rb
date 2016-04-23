class CommentLike < ActiveRecord::Base
  validates  :comment_id, uniqueness: { scope: :user_id }
  belongs_to :comment
  has_one    :user
end
