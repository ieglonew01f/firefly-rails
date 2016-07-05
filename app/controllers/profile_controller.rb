class ProfileController < ApplicationController
  def index
    @posts = Post.all.order(created_at: :desc) #needs to change it to this profile posts only
    @user = User.find_by_username(params[:username])
    #todo some error handling if no username is found
  end
end
