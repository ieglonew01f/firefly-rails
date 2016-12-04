class OnlineUsersController < InheritedResources::Base

  private

    def online_user_params
      params.require(:online_user).permit(:user_id, :is_online)
    end
end

