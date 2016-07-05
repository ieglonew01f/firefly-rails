class RemoveUserIdFromUserProfiles < ActiveRecord::Migration
  def change
    remove_column :user_profiles, :user_id, :integer
  end
end
