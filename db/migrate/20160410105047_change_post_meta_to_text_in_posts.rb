class ChangePostMetaToTextInPosts < ActiveRecord::Migration
  def up
    change_column :posts, :post_meta, :text
  end

  def down
    change_column :posts, :post_meta, :string
  end
end
