class AddUserProfileIdToUsers < ActiveRecord::Migration
  def change
    add_column :users, :user_profile_id, :integer
  end
end
