require 'link_thumbnailer'

class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /posts
  # GET /posts.json
  def index
    @posts = Post.all
  end

  # GET /posts/1
  # GET /posts/1.json
  def show
  end

  # GET /posts/new
  def new
    @post = Post.new
  end

  # GET /posts/1/edit
  def edit
  end

  # POST /posts
  # POST /posts.json
  def create
    post = Post.new
    post.content = params[:post_text]
    post.post_type = params[:post_type]
    post.user_id = current_user.id

    if post.save
      post_data = {
        user: {
          first_name: current_user.first_name,
          last_name: current_user.last_name,
          profile_picture: current_user.user_profile.profile_picture,
        },
        post: post
      }
      success_json(200, 'Posted successfully', post_data)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  def update
    this_post = User.find(current_user.id).posts
    if !this_post.blank? #if the user trying to delete is the owner of the post
      if this_post.find(params[:post_id]).update(content: params[:post_content])
        success_json(200, 'Post updated successfully', nil)
      else
        error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
      end
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  # DELETE /posts/1
  # DELETE /posts/1.json
  def destroy
    if @post.destroy
      success_json(200, 'Post deleted successfully', nil)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  #Get expanding url
  #this api crunches links and shits an object with images, headers etc
  def expand_url
    link = params[:link]

    if link.blank?
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    else
      page_object = LinkThumbnailer.generate(link)
      success_json(200, 'Expanded url data', page_object)
    end

  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post
      @post = Post.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_params
      params.require(:post).permit(:content, :user_id, :post_type)
    end
end
