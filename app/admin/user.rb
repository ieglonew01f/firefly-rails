ActiveAdmin.register User do

  permit_params :username, :first_name, :last_name, :email, :encrypted_password, :reset_password_token, :location, :home, :schooling, :college, :banner_position, :about, :gender, :relationship_status, :profile_picture, :banner

  index do
    column :id
    column :username
    column :first_name
    column :last_name
    column :email
    column :location
    column :home
    column :schooling
    column :college
    column :banner_position
    column :about
    column :relationship_status
    column :profile_picture
    column :banner
    column :encrypted_password
    column :reset_password_token
    actions
  end

  show do
    attributes_table do
      row :id
      row :username
      row :first_name
      row :last_name
      row :email
      row :location
      row :home
      row :schooling
      row :college
      row :banner_position
      row :about
      row :relationship_status
      row :profile_picture
      row :banner
      row :encrypted_password
      row :reset_password_token
    end
    active_admin_comments
  end

  form do |f|
    f.semantic_errors
    f.inputs "Edit Profile" do
      f.input :id
      f.input :username
      f.input :first_name
      f.input :last_name
      f.input :email
      f.input :location
      f.input :home
      f.input :schooling
      f.input :college
      f.input :banner_position
      f.input :about
      f.input :relationship_status
      f.input :profile_picture
      f.input :banner
      f.input :encrypted_password
      f.input :reset_password_token
    end
    f.actions
  end
#
# or
#
# permit_params do
#   permitted = [:permitted, :attributes]
#   permitted << :other if params[:action] == 'create' && current_user.admin?
#   permitted
# end

  #controller do
    #def update
      #column :id
    #end
  #end
end
