class AddIndexToPeople < ActiveRecord::Migration
  def change
    add_index :people, [:by_id, :for_id], unique: true
  end
end
