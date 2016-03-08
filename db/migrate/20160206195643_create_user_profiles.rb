class CreateUserProfiles < ActiveRecord::Migration
  def change
    create_table :user_profiles do |t|
      t.integer :user_id
      t.integer :gender
      t.string :location
      t.string :home
      t.string :schooling
      t.string :college
      t.integer :relationship_status
      t.text :profile_picture
      t.text :banner
      t.string :banner_position
      t.string :about

      t.timestamps null: false
    end
  end
end
