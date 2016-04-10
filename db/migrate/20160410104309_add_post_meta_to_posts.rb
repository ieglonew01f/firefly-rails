class AddPostMetaToPosts < ActiveRecord::Migration
  def change
    add_column :posts, :post_meta, :string
  end
end
