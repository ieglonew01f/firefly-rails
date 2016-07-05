class AddProfileColumnsToUsers < ActiveRecord::Migration
  #def change
    #add_column :location, :home, :schooling, :college, :banner_position, :about, :string
    #add_column :gender, :relationship_status, :integer
    #add_column :profile_picture, :banner, :string
  #end
  def change
    change_table :users do |t|
      t.string :location, :home, :schooling, :college, :banner_position, :about
      t.integer :gender, :relationship_status
      t.text :profile_picture, :banner
    end
  end
end
