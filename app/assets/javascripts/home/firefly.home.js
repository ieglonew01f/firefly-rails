FIREFLY.HOME = {};

FIREFLY.HOME = (function() {
    'use strict';
    var posts = FIREFLY.POSTS,
        $root  = $('.post-container');

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

        //like unlike button handler
        $root.on('click', '.like-btn-a', function(){
            posts.like_a_post($(this));
        });

        //unlike unlike button handler
        $root.on('click', '.unlike-btn-a', function(){
            posts.unlike_a_post($(this));
        });
    };

    var init = function() {
        event_listners();
    };

    return {
        init: init
    };
})();


$(document).ready(function(){
    FIREFLY.HOME.init();
});
