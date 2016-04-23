json.array!(@comment_likes) do |comment_like|
  json.extract! comment_like, :id, :user_id, :comment_id, :comment, :comment_type
  json.url comment_like_url(comment_like, format: :json)
end
