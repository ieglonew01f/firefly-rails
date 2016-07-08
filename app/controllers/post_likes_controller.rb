class PostLikesController < ApplicationController
  def create
    post_like = PostLike.new
    post_like.post_id = params[:post_id]
    post_like.user_id = current_user.id

    if post_like.save
      post_like_data = {
        user: {
          first_name: current_user.first_name,
          last_name: current_user.last_name,
          profile_picture: current_user.profile_picture,
        },
        post_like: post_like
      }
      success_json(200, 'Post liked successfully', post_like_data)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end

  def destroy
    post_like = PostLike.where(user_id: current_user.id, post_id: params[:post_id]).first

    if post_like.destroy
      success_json(200, 'Post unliked successfully', nil)
    else
      error_json(422, 422, 'Looks like something went wrong while processing your request, please try again after sometime.')
    end
  end
end
