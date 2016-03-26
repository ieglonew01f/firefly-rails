json.array!(@post_meta) do |post_metum|
  json.extract! post_metum, :id, :meta_data, :meta_id, :meta_type
  json.url post_metum_url(post_metum, format: :json)
end
