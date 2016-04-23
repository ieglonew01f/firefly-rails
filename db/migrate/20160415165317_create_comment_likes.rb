class CreateCommentLikes < ActiveRecord::Migration
  def change
    create_table :comment_likes do |t|
      t.integer :user_id
      t.integer :comment_id
      t.string :comment
      t.integer :comment_type

      t.timestamps null: false
    end
  end
end
