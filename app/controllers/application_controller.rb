class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :null_session
  include ApplicationHelper

  def after_sign_in_path_for(resource)
    '/home'
  end

  def after_sign_up_path_for(resource)
    '/'
  end

end
