json.array!(@people) do |person|
  json.extract! person, :id, :by_id, :for_id, :status
  json.url person_url(person, format: :json)
end
