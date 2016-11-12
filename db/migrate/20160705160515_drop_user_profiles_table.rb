class DropUserProfilesTable < ActiveRecord::Migration
  def change
    return true
    drop_table :user_profiles
  end
end
