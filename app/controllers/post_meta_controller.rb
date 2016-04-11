class PostMetaController < ApplicationController
  before_action :set_post_metum, only: [:show, :edit, :update, :destroy]

  # GET /post_meta
  # GET /post_meta.json
  def index
    @post_meta = PostMetum.all
  end

  # GET /post_meta/1
  # GET /post_meta/1.json
  def show
  end

  # GET /post_meta/new
  def new
    @post_metum = PostMetum.new
  end

  # GET /post_meta/1/edit
  def edit
  end

  # POST /post_meta
  # POST /post_meta.json
  def create
    post_metum = PostMetum.new(post_metum_params.merge(:user_id => current_user.id))
    if post_metum.save
      success_json(200, 'Meta saved successfully', post_metum)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  # PATCH/PUT /post_meta/1
  # PATCH/PUT /post_meta/1.json
  def update
    respond_to do |format|
      if @post_metum.update(post_metum_params)
        format.html { redirect_to @post_metum, notice: 'Post metum was successfully updated.' }
        format.json { render :show, status: :ok, location: @post_metum }
      else
        format.html { render :edit }
        format.json { render json: @post_metum.errors, status: :unprocessable_entity }
      end
    end
  end

  # DELETE /post_meta/1
  # DELETE /post_meta/1.json
  def destroy
    @post_metum.destroy
    respond_to do |format|
      format.html { redirect_to post_meta_url, notice: 'Post metum was successfully destroyed.' }
      format.json { head :no_content }
    end
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_post_metum
      @post_metum = PostMetum.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def post_metum_params
      params.require(:post_metum).permit(:meta_data, :meta_id, :meta_type)
    end
end
