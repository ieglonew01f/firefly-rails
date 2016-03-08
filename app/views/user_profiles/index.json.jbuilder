json.array!(@user_profiles) do |user_profile|
  json.extract! user_profile, :id, :user_id, :gender, :location, :home, :schooling, :college, :relationship_status, :profile_picture, :banner, :banner_position, :about
  json.url user_profile_url(user_profile, format: :json)
end
