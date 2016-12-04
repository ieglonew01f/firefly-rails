json.array!(@online_users) do |online_user|
  json.extract! online_user, :id, :user_id, :is_online
  json.url online_user_url(online_user, format: :json)
end
