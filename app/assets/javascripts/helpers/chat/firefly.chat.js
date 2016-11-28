FIREFLY.CHAT = {};

FIREFLY.CHAT = (function() {
    'use strict';

    var utils                      = FIREFLY.UTILS,
        chat_window_template       = utils.get_template($('#chat-window-template')),
        chat_outgoing_template     = utils.get_template($('#chat-window-outgoing-message')),
        chat_incomming_template    = utils.get_template($('#chat-window-incomming-message')),
        chat_window_dom            = $('.chat-window-holder'),
        open_chat_windows_count    = 1,
        chat_window_buffer         = 30;

    var drawNewChatWindow = function(self, data) {
        if(data) {
            var fullname = data.fullname,
                userId = data.user_id;
        }
        else {
            var fullname = self.attr('data-fname') || data.fullname,
                userId = self.attr('data-uid' || data.user_id);
        }

        $(chat_window_template({
            position: getChatWindowPosition(open_chat_windows_count),
            name: fullname || 'Not Available',
            user_id: userId
        })).appendTo(chat_window_dom);
        open_chat_windows_count = open_chat_windows_count + 1;

        $('.chat-send-message-input[data-uid="' + userId + '"]').focus();
    };

    var destroyChatWindow = function (self) {
        self.parents('.chat-window').destroy();
        open_chat_windows_count = open_chat_windows_count - 1;
    };

    var getChatWindowPosition = function (open_chat_windows_count) {
        if (open_chat_windows_count === 1) chat_window_buffer = 0;
        return parseInt(open_chat_windows_count * 255) + chat_window_buffer;
    };

    var sendNewMessage = function (self, dispatcher) {
        var message = self.val(),
            target_id = self.attr('data-uid');

        var message = {
            message: message,
            target_id: parseInt(target_id)
        };

        dispatcher.trigger('new_message', message);

        /* post processing after sending message
           clear the input
           append the sent message to chat div
        */
        self.val('');
        self.parents('.chat-window')
            .find('.body')
            .append(
                $(chat_outgoing_template({
                    message: message.message
                }))
            );
    };

    var recieveNewMessage = function (data) {
        /* Build and open chat window if not already present in dom */
        console.log(data);

        if($('#chat-window-id-' + data.by_id).length === 0) {
            var buildData = {
                fullname: 'Mukunda', //to replace
                user_id: data.by_id
            };

            drawNewChatWindow(null, buildData);
        }

        $('#chat-window-id-' + data.by_id).find('.body')
            .append(
                $(chat_incomming_template({
                    message: data.message
                }))
            );
    };

    return {
        drawNewChatWindow: drawNewChatWindow,
        destroyChatWindow: destroyChatWindow,
        sendNewMessage: sendNewMessage,
        recieveNewMessage: recieveNewMessage
    };
})();