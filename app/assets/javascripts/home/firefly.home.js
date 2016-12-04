FIREFLY.HOME = {};

FIREFLY.HOME = (function() {
    'use strict';
    var posts  = FIREFLY.POSTS,
        chat   = FIREFLY.CHAT,
        $root  = $('.post-container'),
        $proot = $('.status-block');

    var event_listners = function() {
        //on click share status
        $('#share-post').click(function() {
              if ($('#text-status').val() === '') return; //do nothing if post message empty
              posts.share_post();
        });

        $root.on('keydown', '.comment-input', function(e){
            if ( e.keyCode === 13 ) {
                var self = $(this);
                if (self.val() === '') return; //do nothing if comment message empty
                posts.share_comment(self);
            }
        });

        //click on comments show comments container
        $root.on('click', '.comment-btn', function() {
            var self = $(this);
            setTimeout(function() {
              self.addClass('animated bounceIn');
            }, 100);

            self.toggleClass('text-primary')
            .removeClass('animated bounceIn')
            .parents('.post-card-block').find('.card-footer').toggleClass('hide');
        });

        //like unlike button handler
        $root.on('click', '.like-btn-a', function() {
            posts.like_a_post($(this));
        });

        //unlike unlike button handler
        $root.on('click', '.unlike-btn-a', function() {
            posts.unlike_a_post($(this));
        });

        //remove post button handler
        $root.on('click', '.remove-post', function() {
            posts.remove_post($(this));
        });

        //edit post handlers
        $root.on('click', '.edit-post', function() {
            var self = $(this);
            var this_post = self.parents('.post-card-block');
            this_post.find('.post-edit-container').show();
            this_post.find('.post-content').hide();
        });

        //saving edited post
        $root.on('click', '.edit-post-save', function(){
            posts.edit_post($(this));
        });

        //cancel btn
        $root.on('click', '.edit-post-cancel', function() {
            var self = $(this);
            var this_post = self.parents('.post-card-block');
            this_post.find('.post-edit-container').hide();
            this_post.find('.post-content').show();
        });

        //upload image post handlers
        $proot.on('click', '#post-photo, #next-img-upload', function() {
            $('#post_metum_meta_data').click();
        });

        $('#post_metum_meta_data').change(function() {
            $('#form-photo-upload').submit();
        });

        //pasting links
        $('#text-status').on('paste', function () {
            var self = $(this);
            setTimeout(function () {
                var link = $(self).val();
                //test if pasted value is a link
                if(isLink(link)) {
                  //make ajax request to get link data
                  posts.parse_linker(link);
                }
            }, 100);
        });

        $(document).on('click', '.btn-comment-like', function() {
            var self = $(this);
            posts.like_a_comment($(this));
        });

        $(document).on('click', '.btn-comment-unlike', function() {
            var self = $(this);
            posts.unlike_a_comment($(this));
        });

        /* Ignore this part experimental */

        var dispatcher = new WebSocketRails('localhost:3000/websocket');

        dispatcher.bind('user_connected', function (data) {
            chat.drawUserOnline(data);
        });

        //not working
        dispatcher.bind('user_disconnected', function (data) {
            chat.eraseUserOnline(data);
        });

        dispatcher.bind('set_online_users', function (data) {
            $.each(data.user_data, function (i, user) {
                chat.drawUserOnline({
                    user_data: user
                });
            });
        });

        dispatcher.bind('recieve_message', function (data) {
            chat.recieveNewMessage(data);
        });

        /* Chat Handlers */
        /* Open chat window */
        $(document).on('click', '.chat-people', function () {
            chat.drawNewChatWindow($(this));
        });

        /* Close chat window */
        $(document).on('click', '.chat-window .icon-close', function () {
           chat.destroyChatWindow($(this));
        });

        /* Send message */
        $(document).on('keydown', '.chat-send-message-input', function( e ) {
            if ( e.keyCode === 13 ) {
                chat.sendNewMessage($(this), dispatcher);
            }
        } )

    };

    //test for link validity
    var isLink = function(string) {
      var regex = /(http|https):\/\/(\w+:{0,1}\w*)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%!\-\/]))?/;
      if(!regex.test(string)) {
        return false;
      } else {
        return true;
      }
    };

    var init_post_images = function () {
        $('.photoset-grid-lightbox').photosetGrid({
            layout: '232',
            width: '100%',
            gutter: '3px',
            highresLinks: true,
            lowresWidth: 300,
            rel: 'gallery-01',
            borderActive: true,
            borderWidth: '3px',
            borderColor: '#000000',
            borderRadius: '3px',
            borderRemoveDouble: false,

            onInit: function(){},
            onComplete: function(){

                $('.photoset-grid-lightbox').css({
                    'visibility': 'visible'
                });

            }
        });
    };

    var init = function() {
        event_listners();
        posts.image_post();
        init_post_images();
    };

    return {
        init: init
    };
})();


$(document).ready(function(){
    FIREFLY.HOME.init();
});
