json.array!(@posts) do |post|
  json.extract! post, :id, :content, :user_id, :post_type
  json.url post_url(post, format: :json)
end
