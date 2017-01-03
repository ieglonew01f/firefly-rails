class CommentsController < ApplicationController
  before_action :set_comment, only: [:show, :edit, :update, :destroy]

  # GET /comments
  # GET /comments.json
  def index
    @comments = Comment.all
  end

  # GET /comments/1
  # GET /comments/1.json
  def show
  end

  # GET /comments/new
  def new
    @comment = Comment.new
  end

  # GET /comments/1/edit
  def edit
  end

  # POST /comments
  # POST /comments.json
  def create
    comment = Comment.new
    comment.comment = params[:comment]
    comment.comment_type = params[:comment_type]
    comment.post_id = params[:post_id]
    comment.user_id = current_user.id

    if comment.save
      comment_data = {
        user: {
          first_name: current_user.first_name,
          last_name: current_user.last_name,
          username: current_user.username,
          profile_picture: current_user.profile_picture,
        },
        comment: comment
      }
      success_json(200, 'Posted successfully', comment_data)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  # PATCH/PUT /comments/1
  # PATCH/PUT /comments/1.json
  def update
    respond_to do |format|
      if @comment.update(comment_params)
        format.html { redirect_to @comment, notice: 'Comment was successfully updated.' }
        format.json { render :show, status: :ok, location: @comment }
      else
        format.html { render :edit }
        format.json { render json: @comment.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /comments/1
  # DELETE /comments/1.json
  def destroy
    @comment.destroy
    respond_to do |format|
      format.html { redirect_to comments_url, notice: 'Comment was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_comment
      @comment = Comment.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def comment_params
      params.require(:comment).permit(:post_id, :image, :user_id, :comment, :type)
    end
end
