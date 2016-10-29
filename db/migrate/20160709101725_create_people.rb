class CreatePeople < ActiveRecord::Migration
  def change
    create_table :people do |t|
      t.integer :by_id
      t.integer :for_id
      t.integer :status

      t.timestamps null: false
    end
  end
end
