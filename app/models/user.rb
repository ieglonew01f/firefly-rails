class User < ActiveRecord::Base
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable
  validates   :email, :first_name, :last_name, presence: true
  validates   :email, uniqueness: true
  validates   :first_name, :last_name, length: { maximum: 35 }
  has_many    :posts
  has_one     :user_profile
end
