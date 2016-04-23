class CommentLikesController < ApplicationController
  before_action :set_comment_like, only: [:show, :edit, :update, :destroy]
  before_action :authenticate_user!

  # GET /comment_likes
  # GET /comment_likes.json
  def index
    @comment_likes = CommentLike.all
  end

  # GET /comment_likes/1
  # GET /comment_likes/1.json
  def show
  end

  # GET /comment_likes/new
  def new
    @comment_like = CommentLike.new
  end

  # GET /comment_likes/1/edit
  def edit
  end

  # POST /comment_likes
  # POST /comment_likes.json
  def create
    comment_like = CommentLike.new
    comment_like.user_id = current_user.id
    comment_like.comment_id = params[:comment_id]

    if comment_like.save
      comment_like_data = {
        user: {
          first_name: current_user.first_name,
          last_name: current_user.last_name,
          profile_picture: current_user.user_profile.profile_picture,
        },
        comment_like: comment_like
      }
      success_json(200, 'Comment liked successfully', comment_like_data)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  # PATCH/PUT /comment_likes/1
  # PATCH/PUT /comment_likes/1.json
  def update
    respond_to do |format|
      if @comment_like.update(comment_like_params)
        format.html { redirect_to @comment_like, notice: 'Comment like was successfully updated.' }
        format.json { render :show, status: :ok, location: @comment_like }
      else
        format.html { render :edit }
        format.json { render json: @comment_like.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comment_likes/1
  # DELETE /comment_likes/1.json
  def destroy
    if @comment_like[0].destroy
      respond_to do |format|
        format.json { render json: {:status_code => 200, :message => "Comment unliked successfully"} }
      end
    else
      format.json { render json: {:status_code => 422, :message => "Looks like something went wrong while processing your request, please try again after sometime."} }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment_like
      @comment_like = CommentLike.where(:comment_id => params[:id], :user_id => current_user.id)
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_like_params
      params.require(:comment_like).permit(:user_id, :comment_id, :comment, :comment_type)
    end
end
