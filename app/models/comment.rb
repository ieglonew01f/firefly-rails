class Comment < ActiveRecord::Base
  belongs_to :post
  has_one    :post
  has_one    :user
end
