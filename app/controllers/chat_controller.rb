class ChatController < WebsocketRails::BaseController
  def initialize_session
    # perform application setup here
    controller_store[:message_count] = 0
  end

  def client_connected
    user = OnlineUser.find_by_user_id(current_user.id)

    if not user.nil?
      if user.is_online == 0
        user.is_online = 1
        user.save
      end
    else
      user = OnlineUser.new
      user.user_id = current_user.id
      user.is_online = 1
      user.save
    end

    online_users = OnlineUser.all
    online_users_arr = []

    if not online_users.empty?

      this_user_data = User.find(current_user.id)

      data = {
          'user_id' => this_user_data.id,
          'full_name' => this_user_data.first_name.to_s + ' ' + this_user_data.last_name.to_s,
          'profile_picture' => this_user_data.profile_picture
      }

      online_users.each do |this_user|
        user_data = User.find(this_user.user_id)

        user_data_obj = {
            'user_id' => user_data.id,
            'full_name' => user_data.first_name.to_s + ' ' + user_data.last_name.to_s,
            'profile_picture' => user_data.profile_picture
        }

        online_users_arr << user_data_obj

        # show everyone that I am online now
        if this_user.user_id != current_user.id
          WebsocketRails.users[this_user.user_id].send_message :user_connected, {:message => 'User Online', :user_data => data}
        end
      end
    end

    WebsocketRails.users[current_user.id] = connection
    connection = WebsocketRails.users[current_user.id]
    connection.send_message :set_online_users, {:message => 'Set online users', :user_data => online_users_arr}
  end

  def new_message
    connection = WebsocketRails.users[message[:target_id]]
    connection.send_message :recieve_message, {:message => message[:message], :by_id => current_user.id}
  end

  def client_disconnected
    logger.info('===================')
    known_connections = WebsocketRails.users[current_user.id]
    known_connections.connections.delete connection
    #user = OnlineUser.find_by_user_id(current_user.id)
    #if not user.nil?
      #user.is_online = 0
      #user.save
    #end
  end
end