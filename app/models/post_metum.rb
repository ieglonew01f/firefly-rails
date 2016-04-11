class PostMetum < ActiveRecord::Base
  has_many :posts
  mount_uploader :meta_data, ImageUploader
  skip_callback :commit, :after, :remove_meta_data!
end
