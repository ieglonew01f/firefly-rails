class HomeController < ApplicationController
    before_action :authenticate_user!
    def index
      @posts = Post.all.order(created_at: :desc)
      @people = User.where("id != ? AND id NOT IN (?)", current_user.id, Person.select('for_id').where("by_id = ?", current_user.id))
    end
end
