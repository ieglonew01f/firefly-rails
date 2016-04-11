class AddUserIdToPostMeta < ActiveRecord::Migration
  def change
    add_column :post_meta, :user_id, :integer
  end
end
