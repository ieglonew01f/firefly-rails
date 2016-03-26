class UserProfile < ActiveRecord::Base
  belongs_to :user
  has_one :user
  mount_uploader :profile_picture, ImageUploader
end
