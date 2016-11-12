class ChatController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def client_connected
    WebsocketRails.users[current_user.id] = connection
  end

  def new_message
    connection = WebsocketRails.users[message[:target_id]]
    connection.send_message :recieve_message, {:message => 'yolo it works'}
  end

  def client_disconnected
    known_connections = WebsocketRails.users[current_user.id]
    known_connections.connections.delete connection
  end
end