WebsocketRails::EventMap.describe do
  # The :client_connected method is fired automatically when a new client connects
  subscribe :client_connected, to: ChatController, with_method: :client_connected

  subscribe :new_message, to: ChatController, with_method: :new_message

end
