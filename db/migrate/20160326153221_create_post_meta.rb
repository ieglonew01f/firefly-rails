class CreatePostMeta < ActiveRecord::Migration
  def change
    create_table :post_meta do |t|
      t.text :meta_data
      t.integer :meta_id
      t.integer :meta_type

      t.timestamps null: false
    end
  end
end
