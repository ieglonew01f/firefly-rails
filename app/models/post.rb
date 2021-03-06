class Post < ActiveRecord::Base
  belongs_to :user
  has_many   :comments
  has_many   :post_likes
  serialize  :post_meta, JSON
end
