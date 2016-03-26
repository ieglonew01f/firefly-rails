require 'test_helper'

class PostMetaControllerTest < ActionController::TestCase
  setup do
    @post_metum = post_meta(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:post_meta)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create post_metum" do
    assert_difference('PostMetum.count') do
      post :create, post_metum: { meta_data: @post_metum.meta_data, meta_id: @post_metum.meta_id, meta_type: @post_metum.meta_type }
    end

    assert_redirected_to post_metum_path(assigns(:post_metum))
  end

  test "should show post_metum" do
    get :show, id: @post_metum
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @post_metum
    assert_response :success
  end

  test "should update post_metum" do
    patch :update, id: @post_metum, post_metum: { meta_data: @post_metum.meta_data, meta_id: @post_metum.meta_id, meta_type: @post_metum.meta_type }
    assert_redirected_to post_metum_path(assigns(:post_metum))
  end

  test "should destroy post_metum" do
    assert_difference('PostMetum.count', -1) do
      delete :destroy, id: @post_metum
    end

    assert_redirected_to post_meta_path
  end
end
