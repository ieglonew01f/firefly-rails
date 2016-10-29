class CreateFollowers < ActiveRecord::Migration
  def change
    create_table :followers do |t|
      t.integer :follower_id
      t.integer :following_id
      t.integer :status

      t.timestamps null: false
    end
  end
end
