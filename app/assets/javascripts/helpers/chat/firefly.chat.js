FIREFLY.CHAT = {};

FIREFLY.CHAT = (function() {
    'use strict';

    var utils                      = FIREFLY.UTILS,
        chat_window_template       = utils.get_template($('#chat-window-template')),
        chat_window_dom            = $('.chat-window-holder'),
        open_chat_windows_count    = 1,
        chat_window_buffer         = 30;

    var drawNewChatWindow = function() {
        $(chat_window_template({
            position: getChatWindowPosition(open_chat_windows_count),
            name: 'Mukunda'
        })).appendTo(chat_window_dom);

        open_chat_windows_count = open_chat_windows_count + 1;
    };

    var destroyChatWindow = function (self) {
        self.parents('chat-window').delete();
        open_chat_windows_count = open_chat_windows_count - 1;
    };

    var getChatWindowPosition = function (open_chat_windows_count) {
        if (open_chat_windows_count === 1) chat_window_buffer = 0;
        return parseInt(open_chat_windows_count * 255) + chat_window_buffer;
    };

    return {
        drawNewChatWindow: drawNewChatWindow,
        destroyChatWindow: destroyChatWindow
    };
})();