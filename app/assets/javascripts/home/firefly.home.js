FIREFLY.HOME = {};

FIREFLY.HOME = (function() {
    'use strict';
    var posts  = FIREFLY.POSTS,
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

        $root.on('click', '.edit-post-save', function(){
            posts.edit_post($(this));
        });

        $root.on('click', '.edit-post-cancel', function() {
            var self = $(this);
            var this_post = self.parents('.post-card-block');
            this_post.find('.post-edit-container').hide();
            this_post.find('.post-content').show();
        });

        //upload image post handlers
        $proot.on('click', '#post-photo', function() {
            $('#post_metum_meta_data').click();
        });

        $('#post_metum_meta_data').change(function() {
            $('#form-photo-upload').submit();
        });
    };

    var init = function() {
        event_listners();
        posts.image_post();
    };

    return {
        init: init
    };
})();


$(document).ready(function(){
    FIREFLY.HOME.init();
});
