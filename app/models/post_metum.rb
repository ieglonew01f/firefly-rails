class PostMetum < ActiveRecord::Base
  has_many :posts
  mount_uploader :meta_data, ImageUploader
end
