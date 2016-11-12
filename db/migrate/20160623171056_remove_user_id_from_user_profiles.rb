class RemoveUserIdFromUserProfiles < ActiveRecord::Migration
  def change
    return true
    remove_column :user_profiles, :user_id, :integer
  end
end
