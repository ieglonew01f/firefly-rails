class ChangeCommentTypeColumnName < ActiveRecord::Migration
  def self.up
    rename_column :comments, :type, :comment_type
  end

  def self.down
    rename_column :comments, :comment_type, :type
  end
end
