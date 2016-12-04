class CreateOnlineUsers < ActiveRecord::Migration
  def change
    create_table :online_users do |t|
      t.integer :user_id
      t.integer :is_online

      t.timestamps null: false
    end
  end
end
