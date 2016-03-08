json.array!(@comments) do |comment|
  json.extract! comment, :id, :post_id, :image, :user_id, :comment, :type
  json.url comment_url(comment, format: :json)
end
