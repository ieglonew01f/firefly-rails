class RemoveUserProfileIdFromUsers < ActiveRecord::Migration
  def change
    remove_column :users, :user_profile_id, :integer
  end
end
