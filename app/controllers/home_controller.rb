class HomeController < ApplicationController
    before_action :authenticate_user!
    def index
      @posts = Post.all.includes([user: :user_profile]).order(created_at: :desc)
    end
end
