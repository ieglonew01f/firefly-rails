class HomeController < ApplicationController
    before_action :authenticate_user!
    def index
      @posts = Post.all.order(created_at: :desc)
      @people = User.where.not(id: current_user.id)
    end
end
