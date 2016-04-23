require 'test_helper'

class CommentLikesControllerTest < ActionController::TestCase
  setup do
    @comment_like = comment_likes(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:comment_likes)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create comment_like" do
    assert_difference('CommentLike.count') do
      post :create, comment_like: { comment: @comment_like.comment, comment_id: @comment_like.comment_id, comment_type: @comment_like.comment_type, user_id: @comment_like.user_id }
    end

    assert_redirected_to comment_like_path(assigns(:comment_like))
  end

  test "should show comment_like" do
    get :show, id: @comment_like
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @comment_like
    assert_response :success
  end

  test "should update comment_like" do
    patch :update, id: @comment_like, comment_like: { comment: @comment_like.comment, comment_id: @comment_like.comment_id, comment_type: @comment_like.comment_type, user_id: @comment_like.user_id }
    assert_redirected_to comment_like_path(assigns(:comment_like))
  end

  test "should destroy comment_like" do
    assert_difference('CommentLike.count', -1) do
      delete :destroy, id: @comment_like
    end

    assert_redirected_to comment_likes_path
  end
end
