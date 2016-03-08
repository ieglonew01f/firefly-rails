class CreateComments < ActiveRecord::Migration
  def change
    create_table :comments do |t|
      t.integer :post_id
      t.text :image
      t.integer :user_id
      t.string :comment
      t.integer :type

      t.timestamps null: false
    end
  end
end
